import Controller from '@ember/controller';
import { isEmpty } from '@ember/utils';
import { action, computed } from '@ember/object';

export default class extends Controller {
  @computed('model.state', 'model.tickets', 'model.locationName')
  get isEventPublishable() {
    return !(this.model.state === 'draft' && (isEmpty(this.model.tickets) || isEmpty(this.model.locationName)));
  }

  @action
  openConfirmModal() {
    this.set('isPublishUnpublishModalOpen', true);
  }

  @action
  togglePublishState() {
    this.set('isPublishUnpublishModalOpen', false);
    const { state } = this.model;
    if (state === 'draft') {
      if (isEmpty(this.model.tickets)) {
        this.notify.error(this.l10n.t('Your event must have tickets before it can be published.'),
          {
            id: 'event_tickets'
          });
        return;
      }
      if (isEmpty(this.model.locationName)) {
        this.notify.error(this.l10n.t('Your event must have a location before it can be published.'),
          {
            id: 'event_location'
          });
        return;
      }
    }
    this.set('isLoading', true);
    this.set('model.state', state === 'draft' ? 'published' : 'draft');
    this.model.save()
      .then(() => {
        if (state === 'draft') {
          this.notify.success(this.l10n.t('Your event has been published successfully.'),
            {
              id: 'event_publish'
            });
        } else {
          this.notify.success(this.l10n.t('Your event has been unpublished.'),
            {
              id: 'event_unpublish'
            });
        }
      })
      .catch(e => {
        console.error('Error while publishing/unpublishing event', e);
        this.set('model.state', state);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'),
          {
            id: 'event_publish_error'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  copyEvent() {
    this.set('isCopying', true);
    this.loader
      .post(`events/${this.model.id}/copy`, {})
      .then(copiedEvent => {
        this.transitionToRoute('events.view.edit', copiedEvent.identifier);
        this.notify.success(this.l10n.t('Event copied successfully'),
          {
            id: 'event_copy_succ'
          });
      })
      .catch(() => {
        this.notify.error(this.l10n.t('Copying of event failed'),
          {
            id: 'event_copy_fail'
          });
      })
      .finally(() => {
        this.set('isCopying', false);
      });
  }
}
