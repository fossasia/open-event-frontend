import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  willDestroy() {
    const user = this.get('model');
    if (user) {
      this.store.unloadRecord(user);
    }
  },

  actions: {
    createUser() {
      this.get('model').save()
        .then(user => {
          this.set('session.newUser', user.get('email'));
          this.transitionToRoute('login');
        })
        .catch(reason => {
          if (reason && reason.hasOwnProperty('errors') && reason.errors[0].status === 409) {
            this.set('errorMessage', this.l10n.t('User already exists.'));
          } else {
            this.set('errorMessage', this.l10n.t('An unexpected error occurred.'));
          }
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
