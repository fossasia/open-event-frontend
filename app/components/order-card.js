import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEqual } from '@ember/utils';

export default Component.extend({
  isFreeOrder: computed('order', function() {
    const amount = this.get('order.amount');
    return amount === null || isEqual(amount, 0);
  }),

  isUserCheckedIn: computed('order.attendees', function() {
    let checkedInUser = this.order.attendees.filterBy('email', this.authManager.currentUser.email).filterBy('isCheckedIn', true);
    return checkedInUser.length !== 0;
  })
});
