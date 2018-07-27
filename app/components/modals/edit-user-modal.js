import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend({
  actions: {
    saveRole(id, isAdmin) {
      this.get('store').findRecord('user', id).then(function(user) {
        user.set('isAdmin', isAdmin);
        user.save();
      });
      this.set('isOpen', false);
    }
  }
});

