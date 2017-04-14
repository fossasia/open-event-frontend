import Ember from 'ember';
import { humanReadableBytes } from 'open-event-frontend/utils/size';
import { resetFormElement } from 'open-event-frontend/utils/form';
import { v4 } from 'ember-uuid';

const { Component, computed, on, run: { later } } = Ember;

export default Component.extend({

  selectedImage: null,

  inputIdGenerated: computed('inputId', function() {
    return this.get('inputId') ? this.get('inputId') : v4();
  }),

  maxSize: computed('maxSizeInKb', function() {
    return humanReadableBytes(this.get('maxSizeInKb'));
  }),

  allowReCrop: computed('selectedImage', 'needsCropper', function() {
    return this.get('needsCropper') && !this.get('selectedImage').includes('http');
  }),

  uploadImage(imageData) {
    this.set('selectedImage', imageData);
    this.set('needsConfirmation', false);
    this.set('uploadingImage', true);
    // TODO-PENDING-API Implement actual upload once API is ready
    later(this, () => {
      this.set('uploadingImage', false);
    }, 6000);
  },

  actions: {
    fileSelected(event) {
      const input = event.target;
      this.errorMessage = '';
      if (input.files && input.files[0]) {
        if (input.files[0].size > (this.maxSizeInMb * 1024 * 1024)) {
          resetFormElement(input);
        } else {
          const reader = new FileReader();
          reader.onload = e => {
            const untouchedImageData = e.target.result;
            if (this.get('needsCropper')) {
              this.set('imgData', untouchedImageData);
              this.set('cropperModalIsShown', true);
            } else {
              this.uploadImage(untouchedImageData);
            }
          };
          reader.readAsDataURL(input.files[0]);
        }
      } else {
        this.errorMessage = 'No FileReader support. Please use a more latest browser';
      }
    },

    imageCropped(croppedImageData) {
      this.set('cropperModalIsShown', false);
      this.uploadImage(croppedImageData);
    },

    removeSelection() {
      if (!this.get('needsConfirmation')) {
        // TODO-PENDING-API Delete image from server once API ready
        this.set('selectedImage', null);
        this.set('imageUrl', null);
      } else {
        this.set('needsConfirmation', false);
      }
    },

    reCrop() {
      this.set('cropperModalIsShown', true);
    }
  },

  _init: on('init', function() {
    this.set('selectedImage', this.get('imageUrl'));
    if (this.get('selectedImage')) {
      this.set('needsConfirmation', true);
    }
  })
});
