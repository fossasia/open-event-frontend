import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import moment from 'moment';


export default class extends Controller.extend(EmberTableControllerMixin) {
  @computed()
  get columns() {
    return [
      {
        name            : 'Order',
        valuePath       : 'order',
        extraValuePaths : ['user', 'status', 'paidVia', 'completedAt', 'createdAt'],
        cellComponent   : 'ui-table/cell/events/view/tickets/attendees/cell-order'
      },
      {
        name      : 'Ticket Name',
        valuePath : 'ticket.name'
      },
      {
        name            : 'Ticket Price',
        valuePath       : 'ticket.price',
        extraValuePaths : ['event', 'discountCode'],
        cellComponent   : 'ui-table/cell/events/view/tickets/attendees/cell-price'
      },
      {
        name      : 'First Name',
        valuePath : 'firstname'
      },
      {
        name      : 'Last Name',
        valuePath : 'lastname'
      },
      {
        name      : 'Email',
        valuePath : 'email'
      },
      {
        name            : 'Actions',
        valuePath       : 'id',
        extraValuePaths : ['order', 'isCheckedIn'],
        cellComponent   : 'ui-table/cell/events/view/tickets/attendees/cell-action',
        actions         : {
          toggleCheckIn: this.toggleCheckIn.bind(this)
        }
      }
    ];
  }

  @action
  toggleCheckIn(attendee_id) {
    const attendee = this.store.peekRecord('attendee', attendee_id, { backgroundReload: false });
    attendee.toggleProperty('isCheckedIn');
    if (attendee.isCheckedIn) {
      let newCheckinTimes = attendee.get('checkinTimes') === null ? `${moment().toISOString()}` : `${attendee.get('checkinTimes')},${moment().toISOString()}`;
      attendee.set('checkinTimes', newCheckinTimes);
    }
    attendee.save()
      .then(savedAttendee => {
        this.notify.success(this.l10n.t(`Attendee ${savedAttendee.isCheckedIn ? 'Checked-In' : 'Checked-Out'} Successfully`));
        this.refreshModel.bind(this)();
      })
      .catch(() => {
        this.notify.error(this.l10n.t('An unexpected error has occurred'));
      });
  }
}
