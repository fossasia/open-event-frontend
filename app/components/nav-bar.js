import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    logout() {
      this.get('authManager').logout();
      this.get('routing').transitionTo('index');
    }
  }
});
