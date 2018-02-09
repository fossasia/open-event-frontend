import Ember from 'ember';

const { Component, run } = Ember;

export default Component.extend({
  tagName           : 'img',
  attributeBindings : ['src'],

  fallback       : '/images/placeholders/Other.jpg',
  fallbackAvatar : '/images/placeholders/avatar.png',

  didInsertElement() {
    if (!this.get('src')) {
      this.set('src', this.get('isAvatar') ? this.get('fallbackAvatar') : this.get('fallback'));
    }
    this.$().on('error', () => {
      run(this, () => {
        this.set('src', this.get('isAvatar') ? this.get('fallbackAvatar') : this.get('fallback'));
      });
    });
  },

  willDestroyElement() {
    this.$().off();
  }
});
