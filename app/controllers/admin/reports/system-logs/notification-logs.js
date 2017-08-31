import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  columns: [
    {
      propertyName     : 'user.first-name',
      template         : 'components/ui-table/cell/admin/reports/system-logs/notification-logs/cell-for',
      title            : 'For',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName : 'received-at',
      template     : 'components/ui-table/cell/admin/reports/system-logs/notification-logs/cell-time',
      title        : 'Time'
    },
    {
      propertyName     : 'title',
      title            : 'Action',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      propertyName     : 'message',
      title            : 'Message',
      template         : 'components/ui-table/cell/admin/reports/system-logs/notification-logs/cell-sanitize',
      disableSorting   : true,
      disableFiltering : true
    }
  ]
});
