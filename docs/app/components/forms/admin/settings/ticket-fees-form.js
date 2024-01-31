import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { countries } from 'open-event-frontend/utils/dictionary/demography';
import { paymentCountries, paymentCurrencies } from 'open-event-frontend/utils/dictionary/payment';
import { orderBy, filter } from 'lodash-es';

@classic
export default class TicketFeesForm extends Component {
  @computed
  get paymentCountries() {
    return orderBy(filter(countries, country => paymentCountries.includes(country.code)), 'name');
  }

  @computed
  get paymentCurrencies() {
    return orderBy(paymentCurrencies, 'name');
  }

  @computed('model.[]')
  get ticketFees() {
    return this.model.filter(fees => fees.country !== 'global');
  }

  getGlobalFee() {
    return this.model.filter(fees => fees.country === 'global')[0];
  }

  @computed('model')
  get globalFees() {
    const globalFee = this.getGlobalFee();
    if (globalFee) {return globalFee}
    const globalFeeItem = this.store.createRecord('ticket-fee', {
      country: 'global'
    });
    this.model.toArray().addObject(globalFeeItem);
    return globalFeeItem;
  }

  @action
  addNewTicket() {
    const settings = this.model;
    const incorrect_settings = settings.filter(function(setting) {
      return (!setting.get('country'));
    });
    if (incorrect_settings.length > 0) {
      this.notify.error(this.l10n.t('Existing items need to be completed before new items can be added.'), {
        id: 'existing_item'
      });
      this.set('isLoading', false);
    } else {
      this.model.addObject(this.store.createRecord('ticket-fee', {
        maximumFee : 0.0,
        serviceFee : 0.0
      }));
    }
  }

  @action
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
