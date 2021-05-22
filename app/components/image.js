import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed } from '@ember/object';
import md5 from 'md5';

@classic
export default class Image extends Component {
  @computed('name', 'imageUrl')
  get link() {
    if (this.imageUrl) {
      return this.imageUrl;
    }
    const name_hash = md5(this.name);
    const link = 'https://www.gravatar.com/avatar/' + name_hash + '?d=retro';
    return link;
  }
}
