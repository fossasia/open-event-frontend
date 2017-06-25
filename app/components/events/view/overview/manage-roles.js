import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames : ['ui', 'fluid', 'card'],
  actions    : {
    openAddUserRoleModal() {
      this.set('isAddUserRoleModalOpen', true);
    },

    addUserRole() {
      this.set('isAddUserRoleModalOpen', false);
    }
  }
});
