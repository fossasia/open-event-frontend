import { filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  routing             : service('-routing'),
  unreadNotifications : filterBy('model.notifications', 'isRead', false),
  footerPages         : filterBy('model.pages', 'place', 'footer')
});
