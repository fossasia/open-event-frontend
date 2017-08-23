import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    openDeleteEventModal() {
      this.set('isEventDeleteModalOpen', true);
    },
    togglePublishState() {
      this.set('isLoading', true);
      const state = this.get('model.state');
      this.set('model.state', state === 'draft' ? 'published' : 'draft');
      this.get('model').save()
        .then(() => {
          this.set('isLoading', false);
          if (state === 'draft') {
            this.notify.success(this.l10n.t('Your event has been published successfully.'));
          } else {
            this.notify.success(this.l10n.t('Your event has been unpublished.'));
          }
        })
        .catch(()=> {
          this.set('isLoading', false);
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        });
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
    },
    copyEvent() {
      this.get('loader')
        .post(`events/${this.get('model').id}/copy`, {})
        .then(copiedEvent => {
          this.transitionToRoute('events.view.edit', copiedEvent.identifier);
          this.get('notify').success(this.l10n.t('Event copied successfully'));
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('Copying of event failed'));
        });
    }
  }
});
