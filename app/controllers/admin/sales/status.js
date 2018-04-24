import Controller from '@ember/controller';

export default Controller.extend({
  columns: [
    {
      propertyName : 'identifier',
      title        : 'Invoice #'
    },
    {
      propertyName     : 'event.name',
      title            : 'Event',
      disableSorting   : true,
      disableFiltering : true

    },
    {
      propertyName : 'created-at',
      template     : 'components/ui-table/cell/admin/sales/status/cell-dated',
      title        : 'Dated'
    },
    {
      propertyName : 'amount',
      template     : 'components/ui-table/cell/admin/sales/status/cell-amount',
      title        : 'Amount'
    },
    {
      propertyName     : 'user.email',
      title            : 'Sent To',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName : 'status',
      title        : 'Status'
    }
  ]
});
