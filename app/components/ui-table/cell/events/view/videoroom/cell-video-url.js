import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed } from '@ember/object';

@classic
export default class CellVideoUrl extends Component {
  @computed
  get shortUrl() {
    let url = this.record.replace('https://', '').replace('www.', '');
    if (url.length > 37) {
      url = url.slice(0, 36) + ' . . .';
    }
    return url;
  }
}
