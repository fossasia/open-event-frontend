import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {

  @action
  changePassword(passwordData) {
    this.set('isLoading', true);
    const payload = {
      'data': {
        'old-password' : passwordData.passwordCurrent,
        'new-password' : passwordData.passwordNew
      }
    };
    this.loader
      .post('/auth/change-password', payload)
      .then(() => {
        this.notify.success(this.l10n.t('Password updated successfully'),
          {
            id: 'pass_upd_succ'
          });
      })
      .catch(error => {
        console.error('Error while updating password', error);
        if (error.errors) {
          this.notify.error(error.errors[0].detail,
            {
              id: 'err_pass_ser'
            });
        } else {
          this.notify.error(this.l10n.t('Unexpected error. Password did not change.'),
            {
              id: 'err_unex_pass'
            });
        }
      })
      .finally(() => {
        this.set('isLoading', false);
        this.setProperties({ 'passwordCurrent': '', 'passwordNew': '', 'passwordRepeat': '' });
      });
  }
}

