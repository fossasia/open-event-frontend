import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

@classic
export default class SessionsSpeakersController extends Controller.extend(EventWizardMixin) {
  async saveEventData() {
    const event = await super.saveEventData(...arguments);

    event.get('isSessionsSpeakersEnabled')
      ? await this.model.speakersCall?.save()
      : await this.model.speakersCall?.destroyRecord();

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
