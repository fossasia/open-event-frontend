import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

@classic
export default class NewController extends Controller {
  @service errorHandler;

  isLoading = false;

  @action
  async save(data) {
    try {
      this.set('isLoading', true);
      const order = data;
      const { paymentMode } = data;
      const current_user = this.authManager.currentUser;
      const userChanges = current_user.changedAttributes();
      if (userChanges.firstName || userChanges.lastName) {
        await current_user.save();
      }
      const { attendees } = data;
      await Promise.all((attendees ? attendees.toArray() : []).map(attendee => attendee.save()));
      order.set('status', 'pending');
      if (data.event.get('isBillingInfoMandatory')) {
        order.set('isBillingEnabled', true);
      }
      if (paymentMode === 'free') {
        order.set('status', 'completed');
      }
      await order.save()
        .then(order => {
          if (order.status === 'pending') {
            this.notify.success(this.l10n.t('Order details saved. Please fill the payment details'),
              {
                id: 'order_det_save'
              });
            this.transitionToRoute('orders.pending', order.identifier);
          } else if (order.status === 'completed' || order.status === 'placed') {
            this.notify.success(this.l10n.t('Order details saved. Your order is successful'),
              {
                id: 'order_succ'
              });
            this.transitionToRoute('orders.view', order.identifier);
          }
        })
        .catch(e => {
          console.error('Error while saving new order', e);
          order.set('status', 'initializing');
          this.errorHandler.handle(e);
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    } catch (e) {
      this.set('isLoading', false);
      console.error('Error while in saving new order', e);
      this.errorHandler.handle(e);
    }
  }
}
