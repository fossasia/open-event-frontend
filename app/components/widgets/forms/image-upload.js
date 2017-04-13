import Ember from 'ember';
import { humanReadableBytes } from 'open-event-frontend/utils/size';
import { resetFormElement } from 'open-event-frontend/utils/form';
import { v4 } from 'ember-uuid';

const { Component, computed } = Ember;

export default Component.extend({

  selectedImage: null,

  inputIdGenerated: computed('inputId', function() {
    return this.get('inputId') ? this.get('inputId') : v4();
  }),

  maxSize: computed('maxSizeInKb', function() {
    return humanReadableBytes(this.get('maxSizeInKb'));
  }),

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
              this.set('selectedImage', untouchedImageData);
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
      this.set('selectedImage', croppedImageData);
    },

    removeSelection() {
      this.set('selectedImage', null);
    },

    reCrop() {
      this.set('cropperModalIsShown', true);
    }
  }
});
