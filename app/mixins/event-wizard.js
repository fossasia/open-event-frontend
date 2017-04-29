import Ember from 'ember';
import moment from 'moment';
import { FORM_DATE_FORMAT, FORM_TIME_FORMAT } from 'open-event-frontend/utils/dictionary/date-time';

const { Mixin, MutableArray } = Ember;

export default Mixin.create(MutableArray, {

  getSteps() {
    return [
      {
        title       : this.i18n.t('Basic Details'),
        description : this.i18n.t('Tell about your event'),
        icon        : 'info icon',
        route       : 'events.view.edit.basic-details'
      },
      {
        title       : this.i18n.t('Sponsors'),
        description : this.i18n.t('Advertise your sponsors'),
        icon        : 'dollar icon',
        route       : 'events.view.edit.sponsors'
      },
      {
        title       : this.i18n.t('Sessions & Speakers'),
        description : this.i18n.t('Expand your event'),
        icon        : 'list icon',
        route       : 'events.view.edit.sessions-speakers'
      }
    ];
  },

  getBasicDetails() {
    return {
      id                   : null,
      name                 : '',
      locationName         : '',
      latitude             : 0.0,
      longitude            : 0.0,
      showMap              : true,
      startDate            : moment().add(1, 'months').format(FORM_DATE_FORMAT),
      startTime            : moment().add(1, 'months').hour(10).minute(0).format(FORM_TIME_FORMAT),
      endDate              : moment().add(1, 'months').format(FORM_DATE_FORMAT),
      endTime              : moment().add(1, 'months').hour(17).minute(0).format(FORM_TIME_FORMAT),
      timezone             : moment.tz.guess(),
      description          : '',
      backgroundUrl        : '',
      logoUrl              : '',
      hasOrganizerInfo     : false,
      organizerName        : '',
      organizerDescription : '',
      externalEventUrl     : this.store.createRecord('social-link', { name: 'External Link' }),
      socialLinks          : [
        this.store.createRecord('social-link', { name: 'Facebook', link: 'https://facebook.com/' }),
        this.store.createRecord('social-link', { name: 'Twitter', link: 'https://twitter.com/' })
      ],
      ticketingSystemEnabled : true,
      tickets                : [],
      externalTicketUrl      : 'http://hola.com',
      discountCodeId         : null,
      discountCode           : '',
      paymentCountry         : 'United States',
      paymentCurrency        : 'USD',
      payByPayPal            : false,
      payByStripe            : false,
      payByCheque            : false,
      payByBank              : false,
      payOnSite              : false,
      privacy                : 'public',
      type                   : null,
      topic                  : null,
      subTopic               : null,
      state                  : 'Draft',
      hasCodeOfConduct       : false,
      codeOfConduct          : '',
      copyright              : 'All rights reserved',
      hasTaxInfo             : false,
      taxInfo                : this.store.createRecord('tax-info'),
      stripe                 : this.store.createRecord('stripe')
    };
  },

  getSponsors() {
    return {
      enabled : true,
      items   : [this.store.createRecord('sponsor')]
    };
  },

  getSessionSpeakers() {
    return {
      enabled           : [],
      tracks            : [],
      sessionTypes      : [],
      microlocations    : [],
      call_for_speakers : this.store.createRecord('call-for-speakers')
    };
  }

});
