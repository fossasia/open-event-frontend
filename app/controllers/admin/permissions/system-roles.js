import Ember from 'ember';

const { Controller } = Ember;
export default Controller.extend({
  actions: {
    openAddSystemrRoleModal() {
      this.set('isAddSystemRoleModalOpen', true);
    },
    addSystemRole() {
      this.set('isAddSystemRoleModalOpen', false);
    }
  }
});
