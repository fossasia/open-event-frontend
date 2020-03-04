import Component from '@ember/component';
import { computed } from '@ember/object';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import { paymentCountries, paymentCurrencies } from 'open-event-frontend/utils/dictionary/payment';
import { orderBy, filter } from 'lodash-es';

export default Component.extend({

  paymentCountries: computed(function() {
    return orderBy(filter(countries, country => paymentCountries.includes(country.code)), 'name');
  }),

  paymentCurrencies: computed(function() {
    return orderBy(paymentCurrencies, 'name');
  }),

  actions: {
    addNewTicket() {
      let settings = this.model;
      let incorrect_settings = settings.filter(function(setting) {
        return (!setting.get('currency') || !setting.get('country'));
      });
      if (incorrect_settings.length > 0) {
        this.notify.error(this.l10n.t('Existing items need to be completed before new items can be added.'), {
          id: 'existing_item'
        });
        this.set('isLoading', false);
      } else {
        this.model.toArray().addObject(this.store.createRecord('ticket-fee', {
          maximumFee : 0.0,
          serviceFee : 0.0
        }));
      }
    },
    deleteTicket(rec) {
      this.set('isLoading', true);
      rec.destroyRecord()
        .then(() => {
          this.notify.success(this.l10n.t('Fee setting deleted successfully'), {
            id: 'fee_delete_succ'
          });
        })
        .catch(e => {
          console.error('Error while deleting ticket', e);
          this.notify.error(this.l10n.t('Oops something went wrong. Please try again'), {
            id: 'fee_err'
          });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
