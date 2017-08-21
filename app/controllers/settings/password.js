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
        .then(data => {
          if (data.error) {
            this.get('notify').error(this.l10n.t(data.error));
          } else {
            this.get('notify').success(this.l10n.t('Password updated successfully'));
            this.set('passwordCurrent', '');
            this.set('passwordNew', '');
            this.set('passwordRepeat', '');
          }
          this.set('isLoading', false);
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('An unexpected error occured. Password did not change.'));
          this.set('isLoading', false);
        });
    }
  }
});
