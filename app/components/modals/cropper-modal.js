import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend({
  onVisible() {
    this.$('.content').css('height', '300px');
    this.$('img').croppie({
      customClass : 'croppie',
      viewport    : {
        width  : 300,
        height : 150,
        type   : 'square'
      },
      boundary: {
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
        if (this.get('onImageCrop')) {
          this.onImageCrop(result);
        }
      });
    }
  }
});
