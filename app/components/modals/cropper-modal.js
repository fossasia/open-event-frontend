import $ from 'jquery';
import ModalBase from 'open-event-frontend/components/modals/modal-base';
import { action } from '@ember/object';
import Croppie from 'croppie';
import 'croppie/croppie.css';

export default class extends ModalBase {
  onVisible() {
    const viewport = {};
    const factor = 150;
    const aspectRatio = this.get('aspectRatio') ?? [2, 1];
    const isBadgeCrop = this.get('cropPanel') ?? [300, 250];
    viewport.width = aspectRatio[0] * factor;
    viewport.height = aspectRatio[1] * factor;
    viewport.type = 'square';
    $('.content', this.element).css('height', isBadgeCrop[0] + 'px');
    this.croppie = new Croppie(this.element.getElementsByTagName('img')[0], {
      customClass : 'croppie',
      viewport,
      boundary    : {
        height: isBadgeCrop[1]
      }
    });
  }

  onHide() {
    const $img = $('img', this.element);
    this.croppie.destroy();
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
    this.croppie.result({ type: 'base64', size: 'original', quality: 1, format: 'jpeg' }).then(result => {
      if (this.onImageCrop) {
        this.onImageCrop(result);
      }
    });
  }
}
