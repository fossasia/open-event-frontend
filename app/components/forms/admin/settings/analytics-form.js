import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    submit() {
      this.sendAction('save');
    }
  }
});
