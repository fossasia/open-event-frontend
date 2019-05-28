import Component from '@ember/component';

export default Component.extend({
  actions: {
    logout() {
      this.authManager.logout();
      this.routing.transitionTo('index');
    }
  }
});
