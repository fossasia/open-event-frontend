import Ember from 'ember';

const { Controller } = Ember;
export default Controller.extend({
  columns: [
    {
      propertyName   : 'event.name',
      title          : 'Event Name',
      disableSorting : true
    },
    {
      propertyName : 'title',
      title        : 'Title'
    },
    {
      propertyName   : 'speakers',
      template       : 'components/ui-table/cell/cell-speakers',
      title          : 'Speakers',
      disableSorting : true
    },
    {
      propertyName : 'submitted-at',
      template     : 'components/ui-table/cell/cell-simple-date',
      title        : 'Submitted At'
    },
    {
      propertyName : 'starts-at',
      template     : 'components/ui-table/cell/cell-date',
      title        : 'Starts At'
    },
    {
      propertyName : 'ends-at',
      template     : 'components/ui-table/cell/cell-date',
      title        : 'Ends At'
    },
    {
      template         : 'components/ui-table/cell/cell-simple-buttons',
      title            : 'Action',
      disableSorting   : true,
      disableFiltering : true
    }
  ]
});
