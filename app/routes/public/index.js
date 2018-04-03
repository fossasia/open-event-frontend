import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import moment from 'moment';

export default Route.extend({
  model() {
    const eventDetails = this.modelFor('public');
    return RSVP.hash({
      event   : eventDetails,
      tickets : eventDetails.query('tickets', {
        filter: [
          {
            and: [
              {
                name : 'sales-starts-at',
                op   : 'le',
                val  : moment().toISOString()
              },
              {
                name : 'sales-ends-at',
                op   : 'ge',
                val  : moment().toISOString()
              }
            ]
          }
        ]
      }),
      speakers: eventDetails.query('speakers', {
        filter: [
          {
            name : 'sessions',
            op   : 'any',
            val  : {
              name : 'state',
              op   : 'eq',
              val  : 'accepted'
            }
          }
        ]
      }),

      sponsors: eventDetails.get('sponsors')
    });
  }
});
