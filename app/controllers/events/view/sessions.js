import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  onSessionRoute: computed('session.currentRouteName', function() {
    let currentRouteName = this.get('session.currentRouteName');
    return currentRouteName !== 'events.view.sessions.create' && currentRouteName !== 'events.view.sessions.edit';
  })
});
