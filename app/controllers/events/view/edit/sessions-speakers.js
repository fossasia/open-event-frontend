import Controller from '@ember/controller';
import { action } from '@ember/object';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default class extends Controller.extend(EventWizardMixin) {

  async saveEventData() {
    const event = await this._super(...arguments);

    event.isSessionsSpeakersEnabled
      ? await this.model.speakersCall.save()
      : await this.model.speakersCall.destroyRecord();

    return event;
  }

  @action
  save() {
    this.saveEventDataAndRedirectTo(
      'events.view.index',
      ['tracks', 'sessionTypes', 'microlocations', 'customForms', 'tickets']
    );
  }
  @action
  move(direction) {
    this.saveEventDataAndRedirectTo(
      direction === 'forwards' ? 'events.view.edit.sponsors' : 'events.view.edit.sponsors',
      ['tracks', 'sessionTypes', 'microlocations', 'customForms', 'tickets']
    );
  }
}
