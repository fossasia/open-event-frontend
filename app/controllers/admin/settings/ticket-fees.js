import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  updateSettings() {
    this.set('isLoading', true);
    const settings = this.model;
    const incorrect_settings = settings.filter(function(setting) {
      return (!setting.country);
    });
    if (incorrect_settings.length > 0) {
      this.notify.error(this.l10n.t('Please fill the required fields.'),
        {
          id: 'fill_req_field'
        });
      this.set('isLoading', false);
    } else {
      settings.save()
        .then(() => {
          this.notify.success(this.l10n.t('Ticket Fee settings have been saved successfully.'),
            {
              id: 'ticket_fee_save'
            });
        })
        .catch(e => {
          console.error('Error while saving ticket fee settings', e);
          this.notify.error(this.l10n.t('An unexpected error has occurred. Settings not saved.'),
            {
              id: 'ticket_fee_error'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
}
