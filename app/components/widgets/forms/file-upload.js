import Component from '@ember/component';
import { computed } from '@ember/object';
import { humanReadableBytes, isFileValid } from 'open-event-frontend/utils/file';
import { v4 } from 'ember-uuid';

export default Component.extend({

  selectedFile  : null,
  allowDragDrop : true,

  inputIdGenerated: computed('inputId', function() {
    return this.inputId ? this.inputId : v4();
  }),

  maxSize: computed('maxSizeInKb', function() {
    return humanReadableBytes(this.maxSizeInKb);
  }),

  uploadFile() {
    this.set('needsConfirmation', false);
    this.set('uploadingFile', true);
    this.loader
      .uploadFile('/upload/files', this.$(`#${this.inputIdGenerated}`))
      .then(file => {
        this.set('fileUrl', JSON.parse(file).url);
        this.notify.success(this.l10n.t('File uploaded successfully'), {
          id: 'file_upload_succ'
        });
      })
      .catch(() => {
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'), {
          id: 'file_upload_err'
        });
      })
      .finally(() => {
        this.set('uploadingFile', false);
      });
  },

  processFiles(files) {
    if (files && files[0]) {
      isFileValid(files[0], this.maxSizeInKb, ['application/pdf', 'application/vnd.ms-powerpoint', 'video/mp4', 'application/vnd.oasis.opendocument.presentation']).then(() => {
        const reader = new FileReader();
        reader.onload = () => {
          this.uploadFile();
        };

        reader.readAsDataURL(files[0]);
      }).catch(error => {
        this.notify.error(error, {
          id: 'file_upload_err_1'
        });
      });
    } else {
      this.notify.error(this.l10n.t('No FileReader support. Please use a more latest browser'), {
        id: 'file_upload_err_brow'
      });
    }
  },

  actions: {
    fileSelected(mode, event) {
      if (mode === 'url') {
        this.set('fileUrl', event.target.value);
      } else {
        this.processFiles(event.target.files);
      }
    },
    removeSelection() {
      if (!this.needsConfirmation || this.edit === true) {
        this.set('selectedFile', null);
        this.set('fileUrl', null);
      } else {
        this.set('needsConfirmation', false);
      }
    }
  },

  init() {
    this._super(...arguments);
    this.set('selectedFile', this.fileUrl);
    if (this.selectedFile) {
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
