import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { isEqual } from '@ember/utils';

@classic
export default class OrderCard extends Component {
  @computed('order')
  get isFreeOrder() {
    const { amount } = this.order;
    return amount === null || isEqual(amount, 0);
  }

  @computed('order.attendees')
  get isUserCheckedIn() {
    const checkedInUser = this.order.attendees.filterBy('email', this.authManager.currentUser.email).filterBy('isCheckedIn', true);
    return checkedInUser.length !== 0;
  }
}
