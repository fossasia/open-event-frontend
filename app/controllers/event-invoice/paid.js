import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  async downloadEventInvoice(eventName, orderId) {
    this.set('isLoading', true);
    try {
      const result = this.loader.downloadFile(`/events/invoices/${this.orderId}`);
      const anchor = document.createElement('a');
      anchor.style.display = 'none';
      anchor.href = URL.createObjectURL(new Blob([result], { type: 'application/pdf' }));
      anchor.download = `${eventName}-EventInvoice-${orderId}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      this.notify.success(this.l10n.t('Here is your Event Invoice'),
        {
          id: 'here_event_invoice'
        });
      document.body.removeChild(anchor);
    } catch (e) {
      console.error('Error while downloading event invoice', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred.'),
        {
          id: 'event_here_error'
        });
    }
    this.set('isLoading', false);
  }
}
