import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import $ from 'jquery';
import Component from '@ember/component';
import { humanReadableBytes, isFileValid } from 'open-event-frontend/utils/file';
import { v4 } from 'ember-uuid';

@classic
export default class FileUpload extends Component {
  selectedFile = null;
  allowDragDrop = true;

  @computed('inputId')
  get inputIdGenerated() {
    return this.inputId ? this.inputId : v4();
  }

  @computed('maxSizeInKb')
  get maxSize() {
    return humanReadableBytes(this.maxSizeInKb);
  }

  uploadFile() {
    this.set('needsConfirmation', false);
    this.set('uploadingFile', true);
    this.loader
      .uploadFile('/upload/files', $(`#${this.inputIdGenerated}`, this.element))
      .then(file => {
        this.set('fileUrl', JSON.parse(file).url);
        this.notify.success(this.l10n.t('File uploaded successfully'), {
          id: 'file_upload_succ'
        });
      })
      .catch(e => {
        console.error('Error while upload file', e);
        this.notify.error(this.l10n.t('Oops something went wrong. Please try again'), {
          id: 'file_upload_err'
        });
      })
      .finally(() => {
        this.set('uploadingFile', false);
      });
  }

  processFiles(files) {
    if (files && files[0]) {
      isFileValid(files[0], this.maxSizeInKb, ['application/pdf', 'application/vnd.ms-powerpoint', 'video/mp4', 'application/vnd.oasis.opendocument.presentation']).then(() => {
        const reader = new FileReader();
        reader.onload = () => {
          this.uploadFile();
        };
        reader.readAsDataURL(files[0]);
      }).catch(error => {
        console.error('Error while reading file', error);
        this.notify.error(error, {
          id: 'file_upload_err_1'
        });
      });
    } else {
      this.notify.error(this.l10n.t('No FileReader support. Please use a more latest browser'), {
        id: 'file_upload_err_brow'
      });
    }
  }

  @action
  fileSelected(mode, event) {
    if (mode === 'url') {
      this.set('fileUrl', event.target.value);
    } else {
      this.processFiles(event.target.files);
    }
  }

  @action
  removeSelection() {
    if (!this.needsConfirmation || this.edit === true) {
      this.set('selectedFile', null);
      this.set('fileUrl', null);
    } else {
      this.set('needsConfirmation', false);
    }
  }

  init() {
    super.init(...arguments);
    this.set('selectedFile', this.fileUrl);
    if (this.selectedFile) {
      this.set('needsConfirmation', true);
    }
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    $(this.element)
      .on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
      })
      .on('dragover dragenter', () => {
        $('.upload.segment', this.element).addClass('drag-hover');
      })
      .on('dragleave dragend drop', () => {
        $('.upload.segment', this.element).removeClass('drag-hover');
      })
      .on('drop', e => {
        this.processFiles(e.originalEvent.dataTransfer.files);
      });
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    $(this.element).off('drag dragstart dragend dragover dragenter dragleave drop');
  }
}
