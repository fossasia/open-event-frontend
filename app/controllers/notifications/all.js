import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import NotificationsMixin from 'open-event-frontend/mixins/notifications';

@classic
export default class AllController extends Controller.extend(NotificationsMixin) {
  @computed('model.notifications', 'model.unread')
  get showMarkAllRead() {
    return this.model.notifications.length > 0 && this.model.unread;
  }
}
