import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';

@classic
export default class VerifyController extends Controller {
  queryParams = ['token'];
  token = null;
  success = false;
  error = null;
  isLoading = false;

  verify(tokenVal) {
    this.set('isLoading', true);
    const payload = {
      data: {
        token: tokenVal
      }
    };
    return this.loader
      .post('auth/verify-email', payload)
      .then(() => {
        this.set('success', true);
      })
      .catch(reason => {
        this.set('error', reason);
        this.set('success', false);
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
