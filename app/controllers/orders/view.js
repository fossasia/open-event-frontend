import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
  printThis: service(),


  actions: {
    downloadInvoice() {
      const selector = '.print';
      const options = {
        header: 'Order Invoice'
      };
      this.get('printThis').print(selector, options);

    }
  }
});
