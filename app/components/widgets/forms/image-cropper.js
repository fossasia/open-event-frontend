import imageCropper from 'ember-cli-image-cropper/components/image-cropper';

export default imageCropper.extend({
  aspectRatio      : 1,
  minCropBoxWidth  : 100,
  minCropBoxHeight : 100,
  cropperContainer : '.cropper-container > img',
  previewClass     : '.img-preview',
  croppedAvatar    : null,

  actions: {
    getCroppedAvatar() {
      const container = this.$(this.get('cropperContainer'));
      const croppedImage = container.cropper('getCroppedCanvas');
      this.set('croppedAvatar', croppedImage);
    }
  }
});
