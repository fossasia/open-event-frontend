import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend({
  onVisible() {
    let viewport = {};
    let factor = 750;
    const aspectRatio = this.getWithDefault('aspectRatio', [2, 1]);
    viewport.width = aspectRatio[0] * factor;
    viewport.height = aspectRatio[1] * factor;
    viewport.type = 'square';
    this.$('.content').css('height', '300px');
    this.$('img').croppie({
      customClass : 'croppie',
      viewport,
      boundary    : {
        height: 250
      }
    });
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
        if (this.onImageCrop) {
          this.onImageCrop(result);
        }
      });
    }
  }
});
