import Controller from '@ember/controller';
import { computed } from '@ember/object';
import NotificationsMixin from 'open-event-frontend/mixins/notifications';

export default Controller.extend(NotificationsMixin, {
  showMarkAllRead: computed('model.notifications', 'model.unread', function() {
    return this.get('model.notifications').length > 0 && this.get('model.unread');
  })
});
