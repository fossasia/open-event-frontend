import Ember from 'ember';

const { Controller } = Ember;
export default Controller.extend({
  columns: [
    {
      propertyName : 'code',
      title        : 'Discount code'
    },
    {
      propertyName   : 'discount-url',
      template       : 'components/ui-table/cell/events/view/tickets/discount-codes/cell-url',
      title          : 'Discount code URL',
      disableSorting : true
    },
    {
      propertyName : 'value',
      template     : 'components/ui-table/cell/events/view/tickets/discount-codes/cell-value',
      title        : 'Discount Per Ticket'
    },
    {
      propertyName : 'valid-till',
      template     : 'components/ui-table/cell/events/view/tickets/discount-codes/cell-validity',
      title        : 'Validity'
    },
    {
      propertyName   : 'is-active',
      template       : 'components/ui-table/cell/events/view/tickets/discount-codes/cell-status',
      title          : 'Status',
      disableSorting : true
    },
    {
      title          : 'Action',
      template       : 'components/ui-table/cell/events/view/tickets/discount-codes/cell-actions',
      disableSorting : true
    }
  ]
});
