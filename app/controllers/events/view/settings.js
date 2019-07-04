import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    openEventTransferModal(id, name) {
      this.setProperties({
        'isEventTransferModalOpen' : true,
        'confirmEventName'         : '',
        'eventId'                  : id,
        'eventName'                : name
      });
    },
    openConfirmEventTransferModal() {
      const currentInvite = this.model.roleInvites.createRecord({});
      let { roles } = this.model;
      for (const role of roles ? roles.toArray() : []) {
        if (role.name === 'owner') {
          currentInvite.set('role', role);
        }
      }
      this.setProperties({
        'isEventTransferModalOpen'        : false,
        'isConfirmEventTransferModalOpen' : true,
        'checked'                         : false,
        currentInvite
      });
    },
    async transferEvent() {
      try {
        this.set('isLoading', true);
        this.currentInvite.set('roleName', 'owner');
        await this.currentInvite.save();
        this.setProperties({
          'isConfirmEventTransferModalOpen' : false,
          'checked'                         : false
        });
        this.notify.success(this.l10n.t('Owner Role Invite sent successfully.'));
      } catch (error) {
        this.notify.error(this.l10n.t(error.message));
      }
      this.set('isLoading', false);
    }
  }
});
