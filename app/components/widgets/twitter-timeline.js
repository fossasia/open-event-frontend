import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
export default class TwitterTimeline extends Component {
  @computed('handleOrProfile')
  get handle() {
    if (this.handleOrProfile && this.handleOrProfile.includes('/')) {
      const splitted = this.handleOrProfile.trim().split('/');
      if (splitted.includes('hashtag')) {
        return null;
      }
      return splitted[splitted.length - 1];
    }
    return this.handleOrProfile;
  }

  @computed('handle')
  get normalizedUrl() {
    if (this.handle) {
      return `https://twitter.com/${this.handle}`;
    }
    return null;
  }
}
