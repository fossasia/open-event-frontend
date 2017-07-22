import Ember from 'ember';
import moment from 'moment';

const { Route, RSVP } = Ember;

export default Route.extend({
  model() {
    const eventDetails = this._super(...arguments);
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

      sponsors: [{ name: 'Sponsor 2', url: '#', logoUrl: 'http://placehold.it/150x60', level: 2, type: 'Gold Sponsor', description: '' },
        { name: 'Sponsor 1', url: '#', logoUrl: 'http://placehold.it/150x60', level: 1, type: 'Gold Sponsor', description: '' },
        { name: 'Sponsor 3', url: '#', logoUrl: 'http://placehold.it/150x60', level: 1, type: 'Silver Sponsor', description: '' }]
    });
  }
});
