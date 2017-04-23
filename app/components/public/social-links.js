import Ember from 'ember';

const { A, Component, computed } = Ember;

export default Component.extend({
  classNames: ['ui', 'basic', 'segment'],

  socialLinks: A(),

  twitterLink: computed('socialLinks.[]', function() {
    return this.get('socialLinks').findBy('isTwitter', true);
  })
});
