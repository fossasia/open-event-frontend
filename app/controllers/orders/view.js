import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  isLoading : false,
  printThis : service(),
  actions   : {
    downloadInvoice() {
      const selector = '.print';
      const options = {
        header     : 'Order Invoice',
        printDelay : 800
      };
      this.get('printThis').print(selector, options);
    }
  },

  downloadTickets(eventName, orderId) {
    this.set('isLoading', true);
    this.get('loader')
      .downloadFile(`/tickets/${this.get('model.order.identifier')}`)
      .then(res => {
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = URL.createObjectURL(new Blob([res], { type: 'application/pdf' }));
        anchor.download = `${eventName}-Tickets-${orderId}.pdf`;
        document.body.appendChild(anchor);
        anchor.click();
        this.get('notify').success(this.get('l10n').t('Here are your tickets'));
        document.body.removeChild(anchor);
      })
      .catch(e => {
        console.warn(e);
        this.get('notify').error(this.get('l10n').t('An unexpected Error occurred'));
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
});
