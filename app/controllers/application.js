import Ember from 'ember';

const { Controller, inject: { service }, computed } = Ember;

export default Controller.extend({
  routing             : service('-routing'),
  unreadNotifications : computed.filterBy('model', 'isRead', false)
});
