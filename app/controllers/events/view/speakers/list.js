import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  columns: [
    {
      propertyName : 'name',
      title        : 'Name'
    },
    {
      propertyName : 'email',
      title        : 'Email'
    },
    {
      propertyName : 'mobile',
      title        : 'Phone'
    },
    {
      propertyName   : 'sessions',
      title          : 'Submitted Sessions',
      template       : 'components/ui-table/cell/events/view/speakers/cell-simple-sessions',
      disableSorting : true
    },
    {
      propertyName : '',
      title        : 'Actions',
      template     : 'components/ui-table/cell/events/view/speakers/cell-buttons'
    }
  ]
});
