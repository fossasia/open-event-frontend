import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {
  getValidationRules() {
    $.fn.form.settings.rules.checkMaxMin = () => {
      return this.get('data.minQuantity') <= this.get('data.maxQuantity');
    };
    $.fn.form.settings.rules.checkMaxTotal = () => {
      return this.get('data.maxQuantity') <= this.get('data.ticketsNumber');
    };
    return {
      inline : true,
      delay  : false,
      on     : 'blur',

      fields: {
        accessCode: {
          identifier : 'access_code',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter access code')
            },
            {
              type  : 'regExp',
              value : '^[a-zA-Z0-9_-]*$'
            }
          ]
        },
        numberOfAccessTickets: {
          identifier : 'number_of_access_tickets',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter number of tickets')
            },
            {
              type   : 'number',
              prompt : this.get('l10n').t('Please enter proper number of tickets')
            }
          ]
        },
        allTicketTypes: {
          identifier : 'all_ticket_types',
          rules      : [
            {
              type   : 'checked',
              prompt : this.get('l10n').t('Please select the appropriate choices')
            }
          ]
        },
        min: {
          identifier : 'min',
          optional   : true,
          rules      : [
            {
              type   : 'number',
              prompt : this.get('l10n').t('Please enter the proper number')
            },
            {
              type   : 'checkMaxMin',
              prompt : this.get('l10n').t('Minimum value should not be greater than maximum')
            }
          ]
        },
        max: {
          identifier : 'max',
          optional   : true,
          rules      : [
            {
              type   : 'number',
              prompt : this.get('l10n').t('Please enter the proper number')
            },
            {
              type   : 'checkMaxMin',
              prompt : this.get('l10n').t('Maximum value should not be less than minimum')
            },
            {
              type   : 'checkMaxTotal',
              prompt : this.get('l10n').t('Maximum value should not be greater than number of tickets')
            }
          ]
        },
        accessCodeStartDate: {
          identifier : 'start_date',
          optional   : false,
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the proper date')
            },
            {
              type   : 'date',
              prompt : this.get('l10n').t('Please enter the proper date')
            }
          ]
        },
        accessCodeEndDate: {
          identifier : 'end_date',
          optional   : false,
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please enter the proper date')
            },
            {
              type   : 'date',
              prompt : this.get('l10n').t('Please enter the proper date')
            }
          ]
        },
        startTime: {
          identifier : 'start_time',
          depends    : 'start_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please give a start time')
            }
          ]
        },
        endTime: {
          identifier : 'end_time',
          depends    : 'end_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please give an end time')
            }
          ]
        }
      }
    };
  },
  accessCode : '',
  accessUrl  : computed('data.code', function() {
    const params = this.get('routing.router.router.state.params');
    return location.origin + this.get('router').urlFor('public', params['events.view'].event_id, { queryParams: { access_code: this.get('data.code') } });
  }),
  actions: {
    submit() {
      this.onValid(() => {
      });
    }
  }
});
