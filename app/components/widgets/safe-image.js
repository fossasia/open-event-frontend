import Component from '@ember/component';
import { run } from '@ember/runloop';

export default Component.extend({
  tagName           : 'img',
  attributeBindings : ['src'],

  fallback       : '/images/placeholders/Other.jpg',
  fallbackAvatar : '/images/placeholders/avatar.png',

  didInsertElement() {
    if (!this.src) {
      this.set('src', this.isAvatar ? this.fallbackAvatar : this.fallback);
    }
    this.$().on('error', () => {
      run(this, () => {
        this.set('src', this.isAvatar ? this.fallbackAvatar : this.fallback);
      });
    });
  },

  willDestroyElement() {
    this.$().off();
  }
});
