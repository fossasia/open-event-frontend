import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import moment from 'moment';


export default class extends Controller.extend(EmberTableControllerMixin) {
  sort_by = 'order.completed_at';
  sort_dir = 'DSC';
  get columns() {
    return [
      {
        name            : 'Order',
        width           : 190,
        valuePath       : 'order',
        extraValuePaths : ['user'],
        cellComponent   : 'ui-table/cell/events/view/tickets/attendees/cell-order'
      },
      {
        name            : 'Ticket Name',
        width           : 80,
        valuePath       : 'ticket.name',
        headerComponent : 'tables/headers/sort',
        isSortable      : true
      },
      {
        name            : 'Date and Time',
        width           : 140,
        valuePath       : 'order.completed_at',
        extraValuePaths : ['order'],
        cellComponent   : 'ui-table/cell/events/view/tickets/attendees/cell-date',
        headerComponent : 'tables/headers/sort',
        isSortable      : true
      },
      {
        name            : 'Ticket Price',
        width           : 90,
        valuePath       : 'ticket.price',
        extraValuePaths : ['event', 'discountCode'],
        cellComponent   : 'ui-table/cell/events/view/tickets/attendees/cell-price',
        headerComponent : 'tables/headers/sort',
        isSortable      : true
      },
      {
        name      : 'First Name',
        valuePath : 'firstname',
        width     : 100
      },
      {
        name      : 'Last Name',
        valuePath : 'lastname',
        width     : 90
      },
      {
        name      : 'Email',
        valuePath : 'email',
        width     : 120
      },
      {
        name            : 'Actions',
        valuePath       : 'id',
        width           : 90,
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
      const newCheckinTimes = attendee.get('checkinTimes') === null ? `${moment().toISOString()}` : `${attendee.get('checkinTimes')},${moment().toISOString()}`;
      attendee.set('checkinTimes', newCheckinTimes);
    }
    attendee.save()
      .then(savedAttendee => {
        const message = savedAttendee.isCheckedIn ? this.l10n.t('Attendee Checked-In Successfully') : this.l10n.t('Attendee Checked-Out Successfully');
        this.notify.success(message);
        this.refreshModel.bind(this)();
      })
      .catch(e => {
        console.error('Error while attendee checking IN/OUT', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      });
  }
}
