import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ProfileRoute extends Route {
  model() {
    return this.modelFor('admin.users.view');
  }
}
