import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';

export default Controller.extend({
  actions: {
    openDeleteEventModal() {
      this.set('isEventDeleteModalOpen', true);
    },
    togglePublishState() {
      if (isEmpty(this.get('model.locationName'))) {
        this.notify.error(this.l10n.t('Your event must have a location before it can be published.'));
        return;
      }
      this.set('isLoading', true);
      const state = this.get('model.state');
      this.set('model.state', state === 'draft' ? 'published' : 'draft');
      this.model.save()
        .then(() => {
          if (state === 'draft') {
            this.notify.success(this.l10n.t('Your event has been published successfully.'));
          } else {
            this.notify.success(this.l10n.t('Your event has been unpublished.'));
          }
        })
        .catch(() => {
          this.set('model.state', state);
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    deleteEvent() {
      this.set('isLoading', true);
      this.model.destroyRecord()
        .then(() => {
          this.transitionToRoute('events');
          this.notify.success(this.l10n.t('Event has been deleted successfully.'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
      this.set('isEventDeleteModalOpen', false);
    },
    copyEvent() {
      this.set('isCopying', true);
      this.loader
        .post(`events/${this.get('model.id')}/copy`, {})
        .then(copiedEvent => {
          this.transitionToRoute('events.view.edit', copiedEvent.identifier);
          this.notify.success(this.l10n.t('Event copied successfully'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('Copying of event failed'));
        })
        .finally(() => {
          this.set('isCopying', false);
        });
    }
  }
});
