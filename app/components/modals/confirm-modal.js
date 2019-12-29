import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend({
  isSmall : true,
  options : {
    closable: false
  },

  actions: {
    deny() {
      if (this.get('confirm.pendingPromise.reject')) {
        this.get('confirm.pendingPromise.reject')();
      }

      this.set('isOpen', false);
    },

    confirm() {
      if (this.get('confirm.pendingPromise.resolve')) {
        this.get('confirm.pendingPromise.resolve')();
      }

      this.set('isOpen', false);
    }
  }

});
