import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    logout() {
      this.get('authManager').logout();
      this.get('routing').transitionTo('index');
    }
  },

  didInsertElement() {
    this._super.call(this);
    this.$('.notification.item').popup({
      popup : '.popup',
      on    : 'click'
    });
  },

  willDestroyElement() {
    this._super.call(this);
    this.$('.notification.item').popup('destroy');
  }
});
