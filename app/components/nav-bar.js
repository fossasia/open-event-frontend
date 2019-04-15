import Component from '@ember/component';

export default Component.extend({
  dummyName: null,

  actions: {
    logout() {
      this.get('authManager').logout();
      this.get('routing').transitionTo('index');
    },

    eventSearch() {
      if (event.code === 'Enter') {
        this.set('event_byName', this.get('dummyName'));
      }
    }
  }
});
