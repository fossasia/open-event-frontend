import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

@classic
export default class OtherDetailsController extends Controller.extend(EventWizardMixin) {
  @action
  save() {
    this.saveEventDataAndRedirectTo(
      'events.view.index',
      ['tickets', 'socialLinks', 'copyright', 'tax', 'stripeAuthorization']
    );
  }

  @action
  async move(direction) {
    try {
      this.saveEventDataAndRedirectTo(
        direction === 'forwards' ? 'events.view.edit.attendee' : 'events.view.edit.basic-details',
        ['tickets', 'socialLinks', 'copyright', 'tax', 'stripeAuthorization']
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
