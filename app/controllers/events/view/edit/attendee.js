import Controller from '@ember/controller';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Controller.extend(EventWizardMixin, {
  async saveForms(data) {
    await Promise.all((data.customForms ? data.customForms.toArray() : []).map(customForm => customForm.save()));
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
        console.error('Error while updating attendee', error);
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
        console.error('Error while moving attendee', error);
        this.notify.error(this.l10n.t(error.message),
          {
            id: 'attendee_move_error'
          });
      }
    }
  }
});
