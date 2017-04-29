import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    logout() {
      this.get('authManager').logout();
      this.get('routing').transitionTo('index');
    },
    expand() {
      // this.$('.ui.sidebar.menu').sidebar({context:this.$('')});
      this.$('.ui.sidebar.menu').sidebar('show');
    }
  }
});
