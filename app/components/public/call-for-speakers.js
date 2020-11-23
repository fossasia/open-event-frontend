import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

@classic
export default class CallForSpeakers extends Component {
  @service
  router;

  @action
  addSpeaker() {
    if (this.session.isAuthenticated) {
      this.router.transitionTo('public.cfs.new-speaker');
    } else {
      this.flashMessages.add({
        message           : 'In order to add Speaker details you need to login',
        type              : 'info',
        preventDuplicates : true
      });
      this.set('isLoginModalOpen', true);
    }
  }

  @action
  addSession() {
    if (this.data.userSpeaker && this.data.userSpeaker.toArray().length) {
      // speaker detail exists
      this.router.transitionTo('public.cfs.new-session');
    } else {
      this.notify.error(this.l10n.t('You need to add your speaker details first before submitting a session'),
        {
          id: 'add_new_session_error'
        });
    }
  }

  @computed('data.userSpeaker')
  get isNewSpeaker() {
    return !(this.data.userSpeaker && this.data.userSpeaker.toArray().length);
  }

  @computed('data.userSession')
  get isNewSession() {
    return !(this.data.userSession && this.data.userSession.toArray().length);
  }
}
