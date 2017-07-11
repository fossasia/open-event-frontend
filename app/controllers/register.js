import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  willDestroy() {
    var user = this.get('model');
    this.store.unloadRecord(user);
  },

  actions: {
    createUser() {
      var user = this.get('model');
      user.save()
        .then(() => {
          this.get('notify').success(`Welcome ${user.get('email')}. Please login to continue.`);
          this.transitionToRoute('login');
        })
        .catch(reason => {
          this.set('isLoading', false);
          if (reason.hasOwnProperty('errors') && reason.errors[0].status === 409) {
            this.set('errorMessage', this.l10n.t('User already exists.'));
          } else {
            this.set('errorMessage', this.l10n.t('An unexpected error occurred.'));
          }
        });
    }
  }
});
