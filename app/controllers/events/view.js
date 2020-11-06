import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
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
      .catch(e => {
        console.error('Error while copying event', e);
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
