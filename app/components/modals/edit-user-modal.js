import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend({
  actions: {
    saveRole(id) {
      this.store.findRecord('user', id).then(function(user) {
        user.save();
      });
      this.set('isOpen', false);
    },
    toggleSalesAdmin(user) {
      user.toggleProperty('isSalesAdmin');
    },
    toggleMarketer(user) {
      user.toggleProperty('isMarketer');
    },
    createAdmin(user, isAdmin) {
      user.set('isAdmin', isAdmin);
    }
  }
});

