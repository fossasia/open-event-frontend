import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
  onSessionRoute: computed('routing.currentRouteName', function() {
    let currentRouteName = this.get('routing.currentRouteName');
    const routes = ['admin.users.view.index', 'admin.users.view.sessions.list', 'admin.users.view.tickets.list', 'admin.users.view.events.list', 'admin.users.view.settings.contact-info', 'admin.users.view.settings.email-preferences', 'admin.users.view.settings.applications'];
    return !routes.includes(currentRouteName);
  })
});

