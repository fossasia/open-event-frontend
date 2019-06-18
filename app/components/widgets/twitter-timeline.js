import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  handle: computed('handleOrProfile', function() {
    if (this.handleOrProfile && this.handleOrProfile.includes('/')) {
      const splitted = this.handleOrProfile.trim().split('/');
      if (splitted.includes('hashtag')) {
        return null;
      }
      return splitted[splitted.length - 1];
    }
    return this.handleOrProfile;
  }),

  normalizedUrl: computed('handle', function() {
    if (this.handle) {
      return `https://twitter.com/${this.handle}`;
    }
    return null;
  })
});
