import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  handle: computed('handleOrProfile', function() {
    if (this.get('handleOrProfile') && this.get('handleOrProfile').includes('/')) {
      const splitted = this.get('handleOrProfile').trim().split('/');
      if (splitted.includes('hashtag')) {
        return null;
      }
      return splitted[splitted.length - 1];
    }
    return this.get('handleOrProfile');
  }),

  normalizedUrl: computed('handle', function() {
    if (this.get('handle')) {
      return `https://twitter.com/${this.get('handle')}`;
    }
    return null;
  })
});
