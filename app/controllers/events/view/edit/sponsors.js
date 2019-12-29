import Controller from '@ember/controller';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { action } from '@ember/object';

export default class extends Controller.extend(EventWizardMixin) {

  @action
  save() {
    this.saveEventDataAndRedirectTo(
      'events.view.index',
      ['sponsors', 'tickets']
    );
  }

  @action
  move(direction) {
    this.saveEventDataAndRedirectTo(
      direction === 'forwards' ? 'events.view.edit.sessions-speakers' : 'events.view.edit.attendee',
      ['sponsors', 'tickets']
    );
  }
}
