import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class SessionItem extends Component {
  hideImage = false;

  @action
  hideSpeakerImage() {
    this.hideImage = !this.hideImage;
    if (!this.args.session.speakers.length) {
      this.hideImage = false;
    }
  }
}
