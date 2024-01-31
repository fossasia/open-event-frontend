import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  saveImages() {
    this.set('isLoading', true);
    this.model.eventImageSize.save()
      .then(() => {
        this.model.speakerImageSize.save()
          .then(() => {
            this.notify.success(this.l10n.t('Image sizes have been saved successfully.'),
              {
                id: 'image_size_save'
              });
          })
          .catch(e => {
            console.error('Error while saving speaker image sizes', e);
            this.notify.error(this.l10n.t('An unexpected error has occurred. Image sizes not saved.'),
              {
                id: 'image_size_error'
              });
          });
      })
      .catch(e => {
        console.error('Error while saving image image size', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred. Image sizes not saved.'),
          {
            id: 'image_size_error_unex'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
