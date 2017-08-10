import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model() {
    let eventDetails = this.modelFor('events.view');
    return RSVP.hash({
      event    : eventDetails,
      sponsors : eventDetails.query('sponsors', {
        'page[size]': 10
      })
    });
  }
});
