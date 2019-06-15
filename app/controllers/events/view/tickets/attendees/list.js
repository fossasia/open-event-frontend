import Controller from '@ember/controller';
import moment from 'moment';
export default Controller.extend({
  columns: [
    {
      propertyName   : 'order',
      template       : 'components/ui-table/cell/events/view/tickets/attendees/cell-order',
      title          : 'Order',
      disableSorting : true
    },
    {
      propertyName : 'ticket.name',
      title        : 'Ticket Name'
    },
    {
      propertyName : 'ticket.price',
      title        : 'Ticket Price',
      template     : 'components/ui-table/cell/events/view/tickets/attendees/cell-price'
    },
    {
      propertyName : 'firstname',
      title        : 'First Name'
    },
    {
      propertyName : 'lastname',
      title        : 'Last Name'
    },
    {
      propertyName : 'email',
      title        : 'Email'
    },
    {
      title          : 'Actions',
      template       : 'components/ui-table/cell/events/view/tickets/attendees/cell-action',
      disableSorting : true
    }
  ],
  actions: {
    toggleCheckIn(attendee) {
      attendee.toggleProperty('isCheckedIn');
      if (attendee.isCheckedIn) {
        let newCheckinTimes = attendee.get('checkinTimes') === null ? `${moment().toISOString()}` : `${attendee.get('checkinTimes')},${moment().toISOString()}`;
        attendee.set('checkinTimes', newCheckinTimes);
      }
      attendee.save()
        .then(savedAttendee => {
          this.notify.success(this.l10n.t(`Attendee ${savedAttendee.isCheckedIn ? 'Checked-In' : 'Checked-Out'} Successfully`));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred'));
        });
    }
  }
});
