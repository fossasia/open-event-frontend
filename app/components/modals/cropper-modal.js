import Ember from 'ember';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

const { run: { later } } = Ember;

export default ModalBase.extend({
  onVisible() {
    later(this, () => {
      const imageHeight = this.$('img').height();
      this.$('.content').css('height', `${imageHeight}px`);
      this.$('img').croppie({
        customClass : 'croppie',
        viewport    : {
          width  : 600,
          height : 300,
          type   : 'square'
        }
      });
    }, 200);
  },

  onHide() {
    this.$('img').croppie('destroy');
    const $img = this.$('img');
    if ($img.parent().is('div.croppie')) {
      $img.unwrap();
    }
  },

  actions: {
    resetImage() {
      this.onHide();
      this.onVisible();
    },
    cropImage() {
      this.$('img').croppie('result', 'base64', 'original', 'jpeg').then(result => {
        if (this.get('onImageCrop')) {
          this.onImageCrop(result);
        }
      });
    }
  }
});
