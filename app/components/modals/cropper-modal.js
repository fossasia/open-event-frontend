import $ from 'jquery';
import ModalBase from 'open-event-frontend/components/modals/modal-base';
import { action } from '@ember/object';
export default class extends ModalBase {
  onVisible() {
    let viewport = {};
    let factor = 150;
    const aspectRatio = this.getWithDefault('aspectRatio', [2, 1]);
    viewport.width = aspectRatio[0] * factor;
    viewport.height = aspectRatio[1] * factor;
    viewport.type = 'square';
    $('.content', this.element).css('height', '300px');
    $('img', this.element).croppie({
      customClass : 'croppie',
      viewport,
      boundary    : {
        height: 250
      }
    });
  }

  onHide() {
    const $img = $('img', this.element);
    $img.croppie('destroy');
    if ($img.parent().is('div.croppie')) {
      $img.unwrap();
    }

  }
  @action
  resetImage() {
    this.onHide();
    this.onVisible();
  }
  @action
  cropImage() {
    $('img', this.element).croppie('result', { type: 'base64', size: 'original', quality: 1, format: 'jpeg' }).then(result => {
      if (this.onImageCrop) {
        this.onImageCrop(result);
      }
    });
  }
}
