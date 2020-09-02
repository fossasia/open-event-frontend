import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';


@classic
export default class UsersController extends Controller {
  @computed('routing.currentRouteName')
  get onSessionRoute() {
    const { currentRouteName } = this.routing;
    const routes = ['admin.users.view.index', 'admin.users.view.sessions.list', 'admin.users.view.tickets.list', 'admin.users.view.events.list', 'admin.users.view.account.profile', 'admin.users.view.account.email-preferences', 'admin.users.view.account.applications'];
    return !routes.includes(currentRouteName);
  }
}

