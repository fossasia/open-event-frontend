import Controller from '@ember/controller';
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import { action } from '@ember/object';
import { paymentCountries } from 'open-event-frontend/utils/dictionary/payment';
import { orderBy, filter } from 'lodash-es';


export default class extends Controller {
  timezones = timezones;
  get countries() {
    return orderBy(filter(countries, country => paymentCountries.includes(country.code)), 'name');
  }

  payment
  @action
  async updateInvoiceModel() {
    this.set('isLoading', true);
    try {
      await this.model.save();
      this.notify.success(this.l10n.t('Admin Billing info has been saved successfully'),
        {
          id: 'admin_billing_save'
        });
    } catch (error) {
      console.error('Error while saving admin billing info', error);
      this.notify.error(this.l10n.t('An unexpected error has occurred. Settings not saved.'),
        {
          id: 'admin_billing_error'
        });
    }
    this.set('isLoading', false);
  }
}
