import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

@classic
export default class AttendeeController extends Controller.extend(EventWizardMixin) {
  async saveForms(data) {
    await Promise.all((data?.customForms?.toArray() ?? []).map(customForm => customForm.save()));
    // await Promise.all((data?.forms ?? []).map(form => form.save()));
    await Promise.all((data?.tickets ?? []).map(ticket => ticket.save()));
    // await this.saveCustomFormTickets(data)
    return data;
  }

  async saveCustomFormTickets(data){
    
    
    await Promise.all((data?.forms ?? []).map(form => form.save()));
    return data
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
      console.error('Error while updating attendee', error);
      this.notify.error(error.message,
        {
          id: 'attendee_error_serv'
        });
    }
  }

  @action
  async move(direction, data) {
    try {
      console.log(data.customForms.toArray())
      debugger
      await this.saveForms(data);
      this.saveEventDataAndRedirectTo(
        direction === 'forwards' ? 'events.view.edit.sponsors' : 'events.view.edit.other-details',
        ['tickets']
      );
    } catch (error) {
      console.error('Error while moving attendee', error);
      this.notify.error(error.message,
        {
          id: 'attendee_move_error'
        });
    }
  }
}
