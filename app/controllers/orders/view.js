import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

@classic
export default class ViewController extends Controller {
  isLoadingInvoice = false;
  isLoadingTickets = false;

  @service
  printThis;

  @computed('model.order.user', 'authManager.currentUser')
  get showTicketsButton() {
    return this.model.order.get('user.id') === this.authManager.currentUser.id || this.authManager.currentUser.isAdmin;
  }


  @action
  async cancelOrder(order_id) {
    this.set('isLoading', true);
    const order = await this.store.peekRecord('order', order_id, { backgroundReload: false });
    order.set('status', 'cancelled');
    try {
      await order.save();
      this.notify.success(this.l10n.t('Order has been cancelled successfully.'));
    } catch (e) {
      console.error('Error while cancelling order', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'));
    } finally {
      this.set('isLoading', false);
      document.querySelector('#top').scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  @action
  downloadInvoice(eventName, orderId) {
    this.set('isLoading', true);
    this.loader
      .downloadFile(`/orders/invoices/${this.model.order.identifier}`)
      .then(res => {
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = URL.createObjectURL(new Blob([res], { type: 'application/pdf' }));
        anchor.download = `${eventName}-Invoice-${orderId}.pdf`;
        document.body.appendChild(anchor);
        anchor.click();
        this.notify.success(this.l10n.t('Here is your Order Invoice'),
          {
            id: 'order_invoi'
          });
        document.body.removeChild(anchor);
      })
      .catch(e => {
        console.warn(e);
        const selector = '.print';
        const options = {
          header     : 'Order Invoice',
          printDelay : 800
        };
        this.printThis.print(selector, options);
      })
      .finally(() => {
        this.set('isLoadingInvoice', false);
      });
  }

  downloadTickets(eventName, orderId) {
    this.set('isLoadingTickets', true);
    this.loader
      .downloadFile(`/tickets/${this.model.order.identifier}`)
      .then(res => {
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = URL.createObjectURL(new Blob([res], { type: 'application/pdf' }));
        anchor.download = `${eventName}-Tickets-${orderId}.pdf`;
        document.body.appendChild(anchor);
        anchor.click();
        this.notify.success(this.l10n.t('Here are your tickets'),
          {
            id: 'tick_pdf'
          });
        document.body.removeChild(anchor);
      })
      .catch(e => {
        console.error('Error while downloading tickets', e);
        this.notify.error(this.l10n.t('Sorry, an unexpected error has occurred. Our developers will fix this.'),
          {
            id: 'unexpected_occur'
          });
      })
      .finally(() => {
        this.set('isLoadingTickets', false);
      });
  }

  @action
  redirectToStartPage(identifierStartEvent) {
    this.router.transitionTo('public.index', identifierStartEvent);
  }
}
