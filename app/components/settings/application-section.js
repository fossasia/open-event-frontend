import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    saveUrl() {
      this.sendAction('saveUrl');
    }
  }
});
