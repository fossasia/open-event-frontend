import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Call for Speakers');
  },

  async model() {
    const eventDetails = this.modelFor('public');
    if (this.get('session.isAuthenticated')) {
      const userSpeaker = await this.get('authManager.currentUser').query('speakers', {
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
      });
      const userSession = await this.get('authManager.currentUser').query('sessions', {
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
      });
      return {
        event        : eventDetails,
        userSpeaker,
        userSession,
        speakersCall : await eventDetails.get('speakersCall')
      };
    } else {
      return {
        event        : eventDetails,
        speakersCall : await eventDetails.get('speakersCall')
      };
    }
  }
});
