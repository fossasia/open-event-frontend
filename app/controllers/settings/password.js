import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    changePassword(passwordData) {
      this.set('isLoading', true);
      let payload = {
        'data': {
          'old-password' : passwordData.passwordCurrent,
          'new-password' : passwordData.passwordNew
        }
      };
      this.get('loader')
        .post('/auth/change-password', payload)
        .then(() => {
          this.get('notify').success(this.l10n.t('Password updated successfully'));
        })
        .catch(error => {
          if (error.error) {
            this.get('notify').error(this.l10n.t(error.error));
          } else {
            this.get('notify').error(this.l10n.t('Unexpected error. Password did not change.'));
          }
        })
        .finally(() => {
          this.set('isLoading', false);
          this.setProperties({ 'passwordCurrent': '', 'passwordNew': '', 'passwordRepeat': '' });
        });
    }
  }
});
