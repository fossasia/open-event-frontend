import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('ui', 'segment')
export default class TrackItem extends Component {
  hideImage = false;

  @action
  hideSpeakerImage() {
    this.toggleProperty('hideImage');
    if (!this.session.speakers.length) {
      this.set('hideImage', false);
    }
  }
}
