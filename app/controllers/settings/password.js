import Controller from '@ember/controller';

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
      this.loader
        .post('/auth/change-password', payload)
        .then(() => {
          this.notify.success(this.l10n.t('Password updated successfully'));
        })
        .catch(error => {
          if (error.errors) {
            this.notify.error(this.l10n.t(`${error.errors[0].detail}`));
          } else {
            this.notify.error(this.l10n.t('Unexpected error. Password did not change.'));
          }
        })
        .finally(() => {
          this.set('isLoading', false);
          this.setProperties({ 'passwordCurrent': '', 'passwordNew': '', 'passwordRepeat': '' });
        });
    }
  }
});
