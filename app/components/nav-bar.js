import Component from '@ember/component';

export default Component.extend({
  actions: {
    logout() {
      this.get('authManager').logout();
      this.get('routing').transitionTo('index');
    }
  }
});
