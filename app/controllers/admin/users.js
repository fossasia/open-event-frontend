import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
  onSessionRoute: computed('routing.currentRouteName', function() {
    let { currentRouteName } = this.routing;
    const routes = ['admin.users.view.index', 'admin.users.view.sessions.list', 'admin.users.view.tickets.list', 'admin.users.view.events.list', 'admin.users.view.account.profile', 'admin.users.view.account.email-preferences', 'admin.users.view.account.applications'];
    return !routes.includes(currentRouteName);
  })
});

