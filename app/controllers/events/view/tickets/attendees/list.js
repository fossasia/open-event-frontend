import Controller from '@ember/controller';

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
      attendee.save()
        .then(() => {
          this.notify.success(this.get('ln10').t('Attendee CheckedIn status modified successfully.'));
        })
        .catch(() => {
          this.notify.error(this.get('ln10').t('An unexpected error has occured'));
        });
    }
  }
});
