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

  async beforeModel(transition) {
    // We don't want to process or transition in fastboot mode
    // Since this is only an intermediate page
    if (this.fastboot.isFastBoot) {return}
    const hash = transition.to.params['public.cfs'] ? transition.to.params['public.cfs'].speaker_call_hash : null;
    const eventDetails = this.modelFor('public');
    const speakersCall = await eventDetails.get('speakersCall');
    /*
    The following should show the CFS page to the user:
     - CFS is not issued by the event organiser
     - CFS is public and no hash is entered
     - CFS is public and a valid hash is entered
     - CFS is private and a valid hash is entered
    */
    if (!speakersCall.announcement) {
      // this.notify.error(this.l10n.t('Call For Speakers has not been issued yet.'));
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
      const userSpeaker = await currentUser.query('speakers', {
        filter: [
          {
            and: [
              {
                name : 'event',
                op   : 'has',
                val  : {
                  name : 'identifier',
                  op   : 'eq',
                  val  : eventDetails.id
                }
              },
              {
                name : 'email',
                op   : 'eq',
                val  : currentUser.email
              }
            ]
          }
        ]
      });
      const userSession = await currentUser.query('sessions', {
        filter: [
          {
            and: [
              {
                name : 'event',
                op   : 'has',
                val  : {
                  name : 'identifier',
                  op   : 'eq',
                  val  : eventDetails.id
                }
              },
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
          }
        ]
      });
      return {
        event        : eventDetails,
        user         : currentUser,
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
}
