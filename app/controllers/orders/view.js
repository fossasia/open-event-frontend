import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    downloadInvoice() {
      window.print();
    }
  }
});
