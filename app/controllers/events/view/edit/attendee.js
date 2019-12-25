import Controller from '@ember/controller';
import { action } from '@ember/object';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default class extends Controller.extend(EventWizardMixin) {

  async saveForms(data) {
    for (const customForm of data.customForms ? data.customForms.toArray() : []) {
      await customForm.save();
    }
    return data;
  }
  @action
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
  }
  @action
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
