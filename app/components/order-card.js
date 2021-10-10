import classic from 'ember-classic-decorator';
import { computed, action } from '@ember/object';
import Component from '@ember/component';
import { isEqual } from '@ember/utils';
import { inject as service } from '@ember/service';

@classic
export default class OrderCard extends Component {

  @service
  router;


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

  @action
  async cancelOrder(order_id) {
    this.set('isLoading', true);
    const order = await this.store.peekRecord('order', order_id, { backgroundReload: false });
    order.set('status', 'cancelled');
    try {
      await order.save();
      this.notify.success(this.l10n.t('Order has been cancelled successfully.'));
      this.router.transitionTo('my-tickets.upcoming.list', 'cancelled');
      this.router.transitionTo('my-tickets.upcoming.list', 'completed');
    } catch (e) {
      console.error('Error while cancelling order', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    } finally {
      this.set('isLoading', false);
    }
  }

}
