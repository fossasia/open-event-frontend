import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames  : ['ui', 'fluid', 'card'],
  roleType    : 'accepted',
  roleInvites : computed('data', 'roleType', function() {
    return this.get('data').filterBy('status', this.get('roleType'));
  }),
  actions: {
    openAddUserRoleModal() {
      this.set('isAddUserRoleModalOpen', true);
    },

    addUserRole() {
      this.set('isAddUserRoleModalOpen', false);
    },
    filter(type) {
      this.set('roleType', type);
    }
  }
});
