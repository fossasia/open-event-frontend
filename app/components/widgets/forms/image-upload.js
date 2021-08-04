import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import $ from 'jquery';
import Component from '@ember/component';
import { humanReadableBytes, isFileValid } from 'open-event-frontend/utils/file';
import { v4 } from 'ember-uuid';

@classic
export default class ImageUpload extends Component {
  @tracked selectedImage = null;
  allowDragDrop = true;
  requiresDivider = false;

  @computed('inputId')
  get inputIdGenerated() {
    return this.inputId ? this.inputId : v4();
  }

  @computed('maxSizeInKb')
  get maxSize() {
    return humanReadableBytes(this.maxSizeInKb);
  }

  @computed('selectedImage', 'needsCropper')
  get allowReCrop() {
    return this.needsCropper && !this.selectedImage.includes('http');
  }

  uploadImage(imageData) {
    this.set('selectedImage', imageData);
    this.set('needsConfirmation', false);
    this.set('uploadingImage', true);
    this.loader
      .post('/upload/image', {
        data: imageData
      })
      .then(image => {
        this.set('uploadingImage', false);
        this.set('imageUrl', image.url);
      })
      .catch(e => {
        console.error('Error while uploading and setting image URL', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        this.set('uploadingImage', false);
        this.set('selectedImage', null);
      });
  }

  processFiles(files) {
    if (files && files[0]) {
      isFileValid(files[0], this.maxSizeInKb, ['image/jpeg', 'image/png']).then(() => {
        const reader = new FileReader();
        reader.onload = e => {
          const untouchedImageData = e.target.result;
          if (this.needsCropper) {
            this.set('imgData', untouchedImageData);
            this.set('cropperModalIsShown', true);
          } else {
            this.uploadImage(untouchedImageData);
          }
        };
        reader.readAsDataURL(files[0]);

      }).catch(error => {
        console.error('Error while image reading and cropping', error);
        this.notify.error(error, {
          id: 'unexpected_image_upload_1'
        });
      });
    } else {
      this.notify.error(this.l10n.t('No FileReader support. Please use a more latest browser'), {
        id: 'unexpected_image_upload_2'
      });
    }

  }

  @action
  fileSelected(event) {
    this.processFiles(event.target.files);
  }

  @action
  imageCropped(croppedImageData) {
    this.set('cropperModalIsShown', false);
    this.uploadImage(croppedImageData);
  }

  @action
  removeSelection() {
    if (!this.needsConfirmation) {
      this.set('selectedImage', null);
      this.set('imageUrl', null);
      if (this.user) {
        this.user.set('avatarUrl', null);
        this.user.save();
      }
    } else {
      this.set('needsConfirmation', false);
    }
  }

  @action
  reCrop() {
    this.set('cropperModalIsShown', true);
  }

  init() {
    super.init(...arguments);
    this.set('selectedImage', this.imageUrl);
    if (this.selectedImage) {
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
