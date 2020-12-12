import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed } from '@ember/object';

@classic
export default class CellStreamUrl extends Component {
    @computed
  get host() {
    return window.location.host;
  }
}
