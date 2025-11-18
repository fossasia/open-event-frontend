import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class EventsViewController extends Controller {
  @service eventCopier;
  isCopying = false;

  @action
  async copyEvent() {
    this.isCopying = true;

    try {
      const copiedEvent = await this.eventCopier.copy(this.model.id);
      this.transitionToRoute('events.view.edit', copiedEvent.identifier);
      this.eventCopier.success();
    } catch (e) {
      console.error('Error copying event', e);
      this.eventCopier.error();
    } finally {
      this.isCopying = false;
    }
  }
}
