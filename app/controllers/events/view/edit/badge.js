import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

@classic
export default class BadgeController extends Controller.extend(EventWizardMixin) {
  async saveForms(data) {
    await Promise.all((data?.badgeForms?.toArray() ?? []).map(badge => badge.save()));
    await Promise.all((data?.tickets ?? []).map(ticket => {
      // console.log(ticket);
      return ticket.save();
    }
    ));
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
      await this.saveForms(data);
      this.saveEventDataAndRedirectTo(
        direction === 'forwards' ? 'events.view.edit.sponsors' : 'events.view.edit.attendee',
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
