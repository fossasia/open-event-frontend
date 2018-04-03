import Controller from '@ember/controller';

export default Controller.extend({
  columns: [
    {
      propertyName     : 'actor',
      title            : 'Actor',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName : 'time',
      template     : 'components/ui-table/cell/admin/reports/system-logs/activity-logs/cell-time',
      title        : 'Time'
    },
    {
      propertyName     : 'action',
      title            : 'Actions',
      disableSorting   : true,
      disableFiltering : true
    }
  ]
});
