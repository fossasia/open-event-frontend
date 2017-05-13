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
    this._super(...arguments);
    this.$('.icon.buttons').find('.button').popup();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.$('.icon.buttons').find('.button').popup('destroy');
  }
});
