import Component from '@ember/component';
import { computed } from '@ember/object';

export default class CellStreamUrl extends Component {
    @computed
  get host() {
    return window.location.host;
  }
}
