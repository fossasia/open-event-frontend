import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model() {
    let eventDetails = this.modelFor('events.view');
    return RSVP.hash({
      event    : eventDetails,
      sponsors : eventDetails.query('sponsors', {
        'page[size]': 10
      }),
      sessionTypes : eventDetails.query('sessionTypes', {}),
      socialLinks  : eventDetails.query('socialLinks', {}),
      statistics   : eventDetails.query('eventStatisticsGeneral', {}),
      orderStat    : eventDetails.query('orderStatistics', {}),
      ticketStat   : eventDetails.query('tickets', {}),
      settings     : this.get('store').queryRecord('setting', {})
    });
  }
});
