import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';

@classic
export default class ResetPasswordController extends Controller {
  queryParams = ['token'];
  token = null;
}
