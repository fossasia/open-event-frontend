import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';
import { computed } from '@ember/object';
import ENV from 'open-event-frontend/config/environment';

@classic
@classNames('ui', 'fluid', 'card')
export default class EventApps extends Component {
  @computed('eventId')
  get webAppGeneratorUrl() {
    return `${ENV.webAppGenerator}/?email=${this.authManager.currentUser.email}&api=${ENV.APP.apiHost}/${ENV.APP.apiNamespace}/events/${this.eventId}`;
  }
}
