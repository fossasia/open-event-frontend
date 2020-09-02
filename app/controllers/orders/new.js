import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class NewController extends Controller {
  isLoading = false;

  @action
  async save(data) {
    try {
      this.set('isLoading', true);
      const order = data;
      const current_user = this.authManager.currentUser;
      const userChanges = current_user.changedAttributes();
      if (userChanges.firstName || userChanges.lastName) {
        await current_user.save();
      }
      const { attendees, paymentMode } = data;
      await Promise.all((attendees ? attendees.toArray() : []).map(attendee => attendee.save()));
      if (paymentMode === 'free') {
        order.set('status', 'completed');
      } else if (paymentMode === 'bank' || paymentMode === 'cheque' || paymentMode === 'onsite') {
        order.set('status', 'placed');
      } else {
        order.set('status', 'pending');
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
          this.notify.error(this.l10n.t(` ${e} Oops something went wrong. Please try again`),
            {
              id: 'order_stat_error'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    } catch (e) {
      this.set('isLoading', false);
      console.error('Error while in saving new order', e);
      this.notify.error(this.l10n.t('Oops something went wrong. Please try again'),
        {
          id: 'some_error'
        });
    }
  }
}
