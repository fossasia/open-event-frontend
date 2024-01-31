import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class SessionFilter extends Component {
  @action
  filter(trackId = null) {
    this.set('selectedTrackId', trackId);
  }
}
