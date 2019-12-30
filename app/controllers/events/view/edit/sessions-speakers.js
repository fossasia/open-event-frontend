import Controller from '@ember/controller';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Controller.extend(EventWizardMixin, {

  async saveEventData() {
    const event = await this._super(...arguments);

    event.get('isSessionsSpeakersEnabled')
      ? await this.get('model.speakersCall').save()
      : await this.get('model.speakersCall').destroyRecord();

    return event;
  },


  actions: {
    save() {
      this.saveEventDataAndRedirectTo(
        'events.view.index',
        ['tracks', 'sessionTypes', 'microlocations', 'customForms', 'tickets']
      );
    },
    move(direction) {
      this.saveEventDataAndRedirectTo(
        direction === 'forwards' ? 'events.view.edit.sponsors' : 'events.view.edit.sponsors',
        ['tracks', 'sessionTypes', 'microlocations', 'customForms', 'tickets']
      );
    }
  }
});

