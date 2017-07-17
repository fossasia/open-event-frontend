import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';

const { Component, computed, $ } = Ember;

export default Component.extend(FormMixin, {
  getValidationRules() {
    $.fn.form.settings.rules.checkMaxMin = () => {
      if (this.get('data.minQuantity') > this.get('data.maxQuantity')) {
        return false;
      }
      return true;
    };
    $.fn.form.settings.rules.checkMaxTotal = () => {
      if (this.get('data.maxQuantity') > this.get('data.ticketsNumber')) {
        return false;
      }
      return true;
    };
    return {
      inline : true,
      delay  : false,
      on     : 'blur',

      fields: {
        discountCode: {
          identifier : 'discount_code',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a discount code')
            },
            {
              type  : 'regExp',
              value : '^[a-zA-Z0-9_-]*$'
            }
          ]
        },
        numberOfdiscountTickets: {
          identifier : 'number_of_discount_tickets',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the number of tickets')
            }
          ]
        },
        discountAmount: {
          identifier : 'discount_amount',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the discount amount')
            }
          ]
        },
        discountPercent: {
          identifier : 'discount_percent',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter the discount percentage')
            }
          ]
        },
        allTicketTypes: {
          identifier : 'all_ticket_types',
          rules      : [
            {
              type   : 'checked',
              prompt : this.l10n.t('Please select the appropriate choices')
            }
          ]
        },
        minOrder: {
          identifier : 'min_order',
          optional   : true,
          rules      : [
            {
              type   : 'integer',
              prompt : this.l10n.t('Please enter a valid integer')
            },
            {
              type   : 'checkMaxMin',
              prompt : this.l10n.t('Minimum value should not be greater than maximum')
            }
          ]
        },
        maxOrder: {
          identifier : 'max_order',
          optional   : true,
          rules      : [
            {
              type   : 'integer',
              prompt : this.l10n.t('Please enter a valid integer')
            },
            {
              type   : 'checkMaxMin',
              prompt : this.l10n.t('Maximum value should not be less than minimum')
            },
            {
              type   : 'checkMaxTotal',
              prompt : this.l10n.t('Maximum value should not be greater than number of tickets')
            }
          ]
        }
      }
    };
  },
  discountLink: computed('data.code', function() {
    const params = this.get('routing.router.router.state.params');
    return location.origin + this.get('routing.router').generate('public', params['events.view'].event_id, { queryParams: { discount_code: this.get('data.code') } });
  }),
  actions: {
    submit() {
      this.onValid(() => {
      });
    }
  }
});
