import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

@classic
export default class IndexRoute extends Route {
  @service
  fastboot;

  titleToken() {
    return this.l10n.t('Call for Speakers');
  }

  getHash(routeInfo) {
    if (!routeInfo) {return null}
    const hash = (routeInfo.params['public.cfs'] || routeInfo.params)?.speaker_call_hash;
    if (hash) {return hash}
    return this.getHash(routeInfo.parent);
  }

  async beforeModel(transition) {
    // We don't want to process or transition in fastboot mode
    // Since this is only an intermediate page
    if (this.fastboot.isFastBoot) {return}
    const hash = this.getHash(transition.to);
    const eventDetails = this.modelFor('public');
    const speakersCall = await eventDetails.get('speakersCall');
    /*
    The following should show the CFS page to the user:
     - CFS is not issued by the event organiser
     - CFS is public and no hash is entered
     - CFS is public and a valid hash is entered
     - CFS is private and a valid hash is entered
    */
    if (!eventDetails.isCfsEnabled) {
      this.transitionTo('public.speakers', eventDetails.identifier);
      return;
    }
    if (!((speakersCall.privacy === 'public' && (!hash || speakersCall.hash === hash)) || (speakersCall.privacy === 'private' && hash === speakersCall.hash))) {
      this.transitionTo('not-found');
    }
  }

  async model() {
    const eventDetails = this.modelFor('public');
    const { currentUser } = this.authManager;
    if (this.session.isAuthenticated) {
      const userSpeaker = await eventDetails.query('speakers', {
        filter: [
          {
            name : 'email',
            op   : 'eq',
            val  : currentUser.email
          }
        ] });
      const userSpeakerInvite = await eventDetails.query('speakerInvites', {
        filter: [
          {
            and: [
              {
                name : 'email',
                op   : 'eq',
                val  : currentUser.email
              },
              {
                name : 'status',
                op   : 'eq',
                val  : 'pending'
              }
            ]
          }
        ],
        include: 'event,session'
      });
      const userSession = await eventDetails.query('sessions', {
        filter: [
          {
            name : 'speakers',
            op   : 'any',
            val  : {
              name : 'email',
              op   : 'eq',
              val  : currentUser.email
            }
          }
        ]
      });
      return {
        event        : eventDetails,
        user         : currentUser,
        userSpeaker,
        userSession,
        userSpeakerInvite,
        speakersCall : await eventDetails.get('speakersCall')
      };
    } else {
      return {
        event        : eventDetails,
        speakersCall : await eventDetails.get('speakersCall')
      };
    }
  }
}
