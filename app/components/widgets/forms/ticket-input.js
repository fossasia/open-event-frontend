import Ember from 'ember';

const { Component, on } = Ember;

export default Component.extend({
  classNames: ['ui', 'celled', 'stackable', 'grid', 'ticket-row'],

  actions: {
    toggleSettings() {
      this.toggleProperty('isExpanded');
    }
  },

  _didRender: on('didRender', function() {
    this.$('.icon.buttons').find('.button').popup();
  })
});
