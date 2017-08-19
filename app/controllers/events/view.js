import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    openDeleteEventModal() {
      this.set('isEventDeleteModalOpen', true);
    },

    deleteEvent() {
      this.set('isLoading', true);
      this.get('model').destroyRecord()
        .then(() => {
          this.set('isLoading', false);
          this.transitionToRoute('events');
          this.notify.success(this.l10n.t('Event has been deleted successfully.'));
        })
        .catch(()=> {
          this.set('isLoading', false);
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        });
      this.set('isEventDeleteModalOpen', false);
    }
  }
});
