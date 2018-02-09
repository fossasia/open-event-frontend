import Ember from 'ember';

const { Controller, inject: { service }, computed } = Ember;

export default Controller.extend({
  routing             : service('-routing'),
  unreadNotifications : computed.filterBy('model.notifications', 'isRead', false),
  footerPages         : computed.filterBy('model.pages', 'place', 'footer')
});
