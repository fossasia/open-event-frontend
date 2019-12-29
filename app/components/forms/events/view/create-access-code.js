import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { later } from '@ember/runloop';

export default Component.extend(FormMixin, {
  getValidationRules() {
    window.$.fn.form.settings.rules.checkMaxMin = () => {
      return this.get('data.minQuantity') <= this.get('data.maxQuantity');
    };

    window.$.fn.form.settings.rules.checkMaxTotal = () => {
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
              prompt : this.l10n.t('Please enter access code')
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
              prompt : this.l10n.t('Please enter number of tickets')
            },
            {
              type   : 'number',
              prompt : this.l10n.t('Please enter proper number of tickets')
            }
          ]
        },
        min: {
          identifier : 'min',
          optional   : true,
          rules      : [
            {
              type   : 'number',
              prompt : this.l10n.t('Please enter the proper number')
            },
            {
              type   : 'checkMaxMin',
              prompt : this.l10n.t('Minimum value should not be greater than maximum')
            }
          ]
        },
        max: {
          identifier : 'max',
          optional   : true,
          rules      : [
            {
              type   : 'number',
              prompt : this.l10n.t('Please enter the proper number')
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
        },
        accessCodeStartDate: {
          identifier : 'start_date',
          optional   : true,
          rules      : [
            {
              type   : 'date',
              prompt : this.l10n.t('Please enter the proper date')
            }
          ]
        },
        accessCodeEndDate: {
          identifier : 'end_date',
          optional   : true,
          rules      : [
            {
              type   : 'date',
              prompt : this.l10n.t('Please enter the proper date')
            }
          ]
        }
      }
    };
  },
  accessCode : '',
  accessLink : computed('data.code', function() {
    const params = this.get('router._router.currentState.routerJsState.params');
    const origin = this.get('fastboot.isFastBoot') ? `${this.get('fastboot.request.protocol')}//${this.get('fastboot.request.host')}` : location.origin;
    let link = origin + this.router.urlFor('public', params['events.view'].event_id, { queryParams: { access_code: this.get('data.code') } });
    this.set('data.accessUrl', link);
    return link;
  }),
  hiddenTickets: computed.filterBy('tickets', 'isHidden', true),

  allTicketTypesChecked: computed('tickets', function() {
    if (this.hiddenTickets.length && this.get('data.tickets').length === this.hiddenTickets.length) {
      return true;
    }

    return false;
  }),

  isLinkSuccess: false,

  actions: {
    toggleAllSelection(allTicketTypesChecked) {
      this.toggleProperty('allTicketTypesChecked');
      let tickets = this.hiddenTickets;
      if (allTicketTypesChecked) {
        this.set('data.tickets', tickets.slice());
      } else {
        this.get('data.tickets').clear();
      }

      tickets.forEach(ticket => {
        ticket.set('isChecked', allTicketTypesChecked);
      });
    },
    updateTicketsSelection(ticket) {
      if (!ticket.get('isChecked')) {
        this.get('data.tickets').pushObject(ticket);
        ticket.set('isChecked', true);
        if (this.get('data.tickets').length === this.hiddenTickets.length) {
          this.set('allTicketTypesChecked', true);
        }
      } else {
        this.get('data.tickets').removeObject(ticket);
        ticket.set('isChecked', false);
        this.set('allTicketTypesChecked', false);
      }
    },
    submit(data) {
      this.onValid(() => {
        this.sendAction('save', data);
      });
    },
    copiedText() {
      this.set('isLinkSuccess', true);
      later(this, () => {
        this.set('isLinkSuccess', false);
      }, 5000);
    }
  }
});
