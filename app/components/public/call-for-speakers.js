import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';

@classic
export default class CallForSpeakers extends Component {
  @action
  openModal() {
    if (this.session.isAuthenticated) {
      this.set('isCfsModalOpen', true);
    } else {
      this.set('isLoginModalOpen', true);
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
