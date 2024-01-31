import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
export default class CreateSessionMessage extends Component {
  @tracked isMessageVisible = true;

  @computed(
    'session.isAuthenticated',
    'isMessageVisible',
    'isNewSpeaker',
    'isNewSession'
  )
  get shouldShowMessage() {
    const speakerIDlength =  this.data.userSpeaker ? this.data.userSpeaker.toArray().length : 0;
    return this.session.isAuthenticated
          && this.isMessageVisible
          && !this.isNewSpeaker
          && this.isNewSession
          && (speakerIDlength > 0);
  }
}
