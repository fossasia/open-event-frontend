import Controller from '@ember/controller'; // eslint-disable-line no-console
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Controller.extend(EventWizardMixin, {
  async saveForms(data) {
    for (const customForm of data.customForms ? data.customForms.toArray() : []) {
      await customForm.save();
    }
    return data;
  },
  actions: {
    async save(data) {
      try {
        await this.saveForms(data);
        this.saveEventDataAndRedirectTo(
          'events.view.index',
          ['tickets']
        );
      } catch (error) {
        this.notify.error(this.l10n.t(error.message),
          {
            id: 'attendee_error_serv'
          });
      }
    },
    async move(direction, data) {
      try {
        await this.saveForms(data);
        this.saveEventDataAndRedirectTo(
          direction === 'forwards' ? 'events.view.edit.sponsors' : 'events.view.edit.basic-details',
          ['tickets']
        );
      } catch (error) {
        this.notify.error(this.l10n.t(error.message),
          {
            id: 'attendee_move_error'
          });
      }
    }
  }
});