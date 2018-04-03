import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Call for Speakers');
  },

  model() {
    const eventDetails = this.modelFor('public');
    return RSVP.hash({
      event       : eventDetails,
      userSpeaker : this.get('authManager.currentUser').query('speakers', {
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
      userSession: this.get('authManager.currentUser').query('sessions', {
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
      speakersCall: eventDetails.get('speakersCall')
    });
  }
});
