import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

@classic
export default class ViewController extends Controller {
  isLoadingInvoice = false;
  isLoadingTickets = false;

  @service
  printThis;

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
        console.warn(e);
        this.notify.error(this.l10n.t('An unexpected Error occurred'),
          {
            id: 'unexpected_occur'
          });
      })
      .finally(() => {
        this.set('isLoadingTickets', false);
      });
  }
}
