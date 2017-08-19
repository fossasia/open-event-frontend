import Ember from 'ember';

const { Controller } = Ember;

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
      title          : 'Action',
      template       : 'components/ui-table/cell/events/view/tickets/attendees/cell-action',
      disableSorting : true
    }
  ]
});
