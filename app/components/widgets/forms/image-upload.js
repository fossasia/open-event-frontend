import Ember from 'ember';
import { humanReadableBytes, isFileValid } from 'open-event-frontend/utils/file';
import { v4 } from 'ember-uuid';

const { Component, computed, run: { later } } = Ember;

export default Component.extend({

  selectedImage : null,
  allowDragDrop : true,

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

  processFiles(files) {
    if (files && files[0]) {
      isFileValid(files[0], this.maxSizeInKb, ['image/jpeg', 'image/png']).then(() => {
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
        reader.readAsDataURL(files[0]);

      }).catch(error => {
        this.notify.error(error);
      });
    } else {
      this.notify.error(this.i18n.t('No FileReader support. Please use a more latest browser'));
    }

  },

  actions: {

    fileSelected(event) {
      this.processFiles(event.target.files);
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

  init() {
    this._super(...arguments);
    this.set('selectedImage', this.get('imageUrl'));
    if (this.get('selectedImage')) {
      this.set('needsConfirmation', true);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.$()
      .on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
      })
      .on('dragover dragenter', () => {
        this.$('.upload.segment').addClass('drag-hover');
      })
      .on('dragleave dragend drop', () => {
        this.$('.upload.segment').removeClass('drag-hover');
      })
      .on('drop', e => {
        this.processFiles(e.originalEvent.dataTransfer.files);
      });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.$().off('drag dragstart dragend dragover dragenter dragleave drop');
  }

});
