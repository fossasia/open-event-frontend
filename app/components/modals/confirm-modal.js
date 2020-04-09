import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend({
  isSmall : true,
  options : {
    closable: false
  },

  actions: {
    deny() {
      if (this.confirm.pendingPromise.reject) {
        this.confirm.pendingPromise.reject();
      }
      this.set('isOpen', false);
    },

    confirm() {
      if (this.confirm.pendingPromise.resolve) {
        this.confirm.pendingPromise.resolve();
      }
      this.set('isOpen', false);
    }
  }

});
