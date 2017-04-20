import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['ui', 'celled', 'stackable', 'grid', 'ticket-row'],

  actions: {
    toggleSettings() {
      this.toggleProperty('isExpanded');
    }
  },

  didRender() {
    this._super.call(this);
    this.$('.icon.buttons').find('.button').popup();
  }
});
