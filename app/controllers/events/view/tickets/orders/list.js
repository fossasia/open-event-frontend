import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  columns: [
    {
      propertyName   : 'user',
      template       : 'components/ui-table/cell/events/view/tickets/orders/cell-order',
      title          : 'Order',
      disableSorting : true
    },
    {
      propertyName : 'amount',
      template     : 'components/ui-table/cell/events/view/tickets/orders/cell-amount',
      title        : 'Total Amount'
    },
    {
      propertyName : 'tickets.length',
      title        : 'Quantity'
    },
    {
      propertyName   : 'user.email',
      title          : 'Buyer/Registration Contact',
      disableSorting : true
    },
    {
      title          : 'Action',
      template       : 'components/ui-table/cell/events/view/tickets/orders/cell-actions',
      disableSorting : true
    }
  ]
});
