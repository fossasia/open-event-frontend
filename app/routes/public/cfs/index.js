import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Call for Speakers');
  },

  async model() {
    const eventDetails = this.modelFor('public');
    return {
      event       : eventDetails,
      userSpeaker : await this.get('authManager.currentUser').query('speakers', {
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
      userSession: await this.get('authManager.currentUser').query('sessions', {
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
      speakersCall: await eventDetails.get('speakersCall')
    };
  }
});
