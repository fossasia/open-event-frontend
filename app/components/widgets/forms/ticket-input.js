import Ember from 'ember';

const { Component, on } = Ember;

export default Component.extend({
  classNames: ['ui', 'celled', 'stackable', 'grid'],

  actions: {
    toggleSettings() {
      this.toggleProperty('isExpanded');
    }
  },

  _didInsertElement: on('didInsertElement', function() {
    this.$('.icon.buttons').find('.button').popup();
  })
});
