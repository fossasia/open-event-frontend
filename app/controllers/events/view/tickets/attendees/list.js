import Controller from '@ember/controller';
import { action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import moment from 'moment-timezone';
import { tracked } from '@glimmer/tracking';


export default class extends Controller.extend(EmberTableControllerMixin) {
  sort_by = 'order.completed_at';
  sort_dir = 'DSC';

  @tracked
  selectAll = false

  get columns() {
    return [
      {
        name            : '',
        width           : 50,
        valuePath       : 'selected',
        cellComponent   : 'ui-table/cell/events/view/tickets/attendees/cell-select',
        headerComponent : 'tables/headers/select-all',
        actions         : {
          toggleSelectAll: this.toggleSelectAll.bind(this)
        },
        options: {
          tags: this.model.tags
        }
      },
      {
        name            : 'Order',
        width           : 190,
        valuePath       : 'order.identifier',
        extraValuePaths : ['order'],
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
        name            : 'Tags',
        width           : 100,
        valuePath       : 'tagId',
        cellComponent   : 'ui-table/cell/events/view/tickets/attendees/cell-tag',
        headerComponent : 'tables/headers/sort',
        isSortable      : true,
        options         : {
          tags: this.model.tags
        }
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
  selectTag(tag) {
    this.selectedTag = tag;
    this.addTag();
  }

  @action
  addTag() {
    if (!this.selectedTag) {return}
    this.model.attendees.data.forEach(attendee => {

      if (attendee.selected) {
        attendee.set('tagId', parseInt(this.selectedTag));
        attendee.save();
      }
    });
    this.toggleSelectAll(false);
    this.selectedTag = null;
  }

  @action
  toggleSelectAll(selected) {
    if (this.selectAll !== selected) {
      this.selectAll = selected;
    }
    this.model.attendees.data.forEach(data => {
      data.set('selected', selected);
    });
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
