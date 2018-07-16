import Controller from '@ember/controller';
import { computed } from '@ember/object';


export default Controller.extend({
  onSessionRoute: computed('routing.currentRouteName', function() {
    let currentRouteName = this.get('routing.currentRouteName');
    return (currentRouteName !== 'admin.users.view.index' && currentRouteName !== 'admin.users.view.sessions.list' && currentRouteName !== 'admin.users.view.events.list');
  })
});

