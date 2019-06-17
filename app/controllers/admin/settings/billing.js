import Controller from '@ember/controller';
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';
import { action } from '@ember/object';

export default class extends Controller {
  timezones = timezones;
  @action
  async updateInvoiceModel() {
    this.set('isLoading', true);
    try {
      await this.model.save();
      this.notify.success(this.l10n.t('Admin Billing info has been saved successfully'));
    } catch (error) {
      this.notify.error(this.l10n.t('An unexpected error has occurred. Settings not saved.'));
    }
    this.set('isLoading', false);
  }
}
