import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class AddOrderController extends Controller {

  @action
  async placeOrder(orderInput) {
    if (orderInput) {
      this.set('orderInput', orderInput);
    }
    this.send('save');
  }

  @action
  async save() {
    try {
      this.set('isLoading', true);
      const { orderInput } = this;
      try {
        const order = await this.loader.post('/orders/create-order', orderInput);
        this.notify.success(this.l10n.t('Order details saved. Please fill further details within {{time}} minutes.', {
          time: this.settings.orderExpiryTime
        }));
        this.transitionToRoute('orders.new', order.data.attributes.identifier);
      } catch (e) {
        console.error('Error while saving order', e);
        this.notify.error(e.response.errors[0].detail);
      } finally {
        this.set('isLoading', false);
      }
    } catch (e) {
      console.error('Error while creating order', e);
      this.notify.error(e);
    }
  }
}
