import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  updateSettings() {
    this.set('isLoading', true);
    const settings = this.model;
    settings.save()
      .then(() => {
        this.notify.success(this.l10n.t('Settings have been saved successfully.'),
          {
            id: 'setting_payment_save'
          });
      })
      .catch(e => {
        console.error('Error while saving payment gateway settings', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred. Settings not saved.'),
          {
            id: 'setting_payment_error'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
