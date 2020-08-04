import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';
import moment from 'moment';

@classic
@classNames('ui', 'segment')
export default class SessionItem extends Component {
  hideImage = false;

  @action
  hideSpeakerImage() {
    this.toggleProperty('hideImage');
    if (!this.session.speakers.length) {
      this.set('hideImage', false);
    }
  }

  @computed('session.event', 'session.startsAt')
  get sessionStartsAtInEventTimezone() {
    return moment.tz(this.session.startsAt, this.session.event.get('timezone'));
  }
}
