import Ember from 'ember';
import ENV from 'open-event-frontend/config/environment';

const { Component, run } = Ember;

export default Component.extend({
  tagName           : 'img',
  attributeBindings : ['src'],

  fallback: `${ENV.APP.apiHost}/static/placeholders/Other.jpg`,

  didInsertElement() {
    this.$().on('error', () => {
      run(this, () => {
        this.set('src', this.get('fallback'));
      });
    });
  },

  willDestroyElement() {
    this.$().off();
  }
});
