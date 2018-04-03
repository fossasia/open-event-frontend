import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  titleToken() {
    return this.l10n.t('New Speaker');
  },

  model() {
    const eventDetails = this.modelFor('public');
    return RSVP.hash({
      event : eventDetails,
      forms : eventDetails.query('customForms', {
        sort         : 'id',
        'page[size]' : 50
      }),
      speaker: this.get('authManager.currentUser').query('speakers', {
        filter: [
          {
            name : 'event',
            op   : 'has',
            val  : {
              name : 'identifier',
              op   : 'eq',
              val  : eventDetails.id
            }
          }
        ]
      }),
      session: this.get('authManager.currentUser').query('sessions', {
        filter: [
          {
            name : 'event',
            op   : 'has',
            val  : {
              name : 'identifier',
              op   : 'eq',
              val  : eventDetails.id
            }
          }
        ]
      }),
      tracks       : eventDetails.query('tracks', {}),
      sessionTypes : eventDetails.query('sessionTypes', {})
    });
  }
});
