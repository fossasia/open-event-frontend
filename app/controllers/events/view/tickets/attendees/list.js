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
        width           : 120,
        valuePath       : 'order.completed_at',
        extraValuePaths : ['order'],
        cellComponent   : 'ui-table/cell/events/view/tickets/attendees/cell-date',
        headerComponent : 'tables/headers/sort',
        isSortable      : true
      },
      {
        name            : 'Ticket Price',
        width           : 50,
        valuePath       : 'ticket.price',
        extraValuePaths : ['event', 'discountCode'],
        cellComponent   : 'ui-table/cell/events/view/tickets/attendees/cell-price',
        headerComponent : 'tables/headers/sort',
        isSortable      : true
      },
      {
        name      : 'First Name',
        valuePath : 'firstname',
        width     : 60
      },
      {
        name      : 'Last Name',
        valuePath : 'lastname',
        width     : 60
      },
      {
        name      : 'Email',
        valuePath : 'email',
        width     : 130
      },
      {
        name            : 'Actions',
        valuePath       : 'id',
        width           : 130,
        extraValuePaths : ['order', 'isCheckedIn', 'event', 'checkinTimes', 'checkoutTimes'],
        cellComponent   : 'ui-table/cell/events/view/tickets/attendees/cell-action',
        actions         : {
          toggleCheckIn: this.toggleCheckIn.bind(this)
        }
      }
    ];
  }

  @action
  toggleCheckIn(attendee_id, date, isCheckedInCurrently) {
    const attendee = this.store.peekRecord('attendee', attendee_id, { backgroundReload: false });
    let myTime = moment().toISOString();
    if (moment(date, 'MM-DD-YYYY').format('MM-DD-YYYY') !== moment().format('MM-DD-YYYY')) {
      myTime = moment(date, 'MM-DD-YYYY');
      myTime = myTime.format('YYYY-MM-DD') + 'T13:00:00.000Z';
    }
    if (!isCheckedInCurrently) {
      const newCheckinTimes = attendee.get('checkinTimes') === null ? `${myTime}` : `${attendee.get('checkinTimes')},${myTime}`;
      attendee.set('checkinTimes', newCheckinTimes);
    } else {
      const newCheckoutTimes = attendee.get('checkoutTimes') === null ? `${myTime}` : `${attendee.get('checkoutTimes')},${myTime}`;
      attendee.set('checkoutTimes', newCheckoutTimes);
    }
    attendee.save()
      .then(() => {
        const message = !isCheckedInCurrently ? this.l10n.t('Attendee Checked-In Successfully') : this.l10n.t('Attendee Checked-Out Successfully');
        this.notify.success(message);
        this.refreshModel.bind(this)();
      })
      .catch(e => {
        console.error('Error while attendee checking IN/OUT', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      });
  }
}
