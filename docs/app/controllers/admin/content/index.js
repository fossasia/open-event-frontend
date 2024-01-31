import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  saveSocials() {
    this.set('isLoading', true);
    const settings = this.model;
    settings.save()
      .then(() => {
        this.notify.success(this.l10n.t('Social links have been saved successfully.'),
          {
            id: 'social_link_upd'
          });
      })
      .catch(e => {
        console.error('Error updating social links', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred. Social links not saved.'),
          {
            id: 'unex_social_error'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
