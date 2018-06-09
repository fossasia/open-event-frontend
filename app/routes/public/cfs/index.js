import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.get('l10n').t('Call for Speakers');
  },

  async beforeModel(transition) {
    let hash = transition.params['public.cfs'].speaker_call_hash;
    const eventDetails = this.modelFor('public');
    const speakersCall = await eventDetails.get('speakersCall');
    /*
    The following should show the CFS page to the user:
     - CFS is public and no hash is entered
     - CFS is public and a valid hash is entered
     - CFS is private and a valid hash is entered
    */
    if (!((speakersCall.privacy === 'public' && (!hash || speakersCall.hash === hash)) || (speakersCall.privacy === 'private' && hash === speakersCall.hash))) {
      this.transitionTo('not-found');
    }
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
