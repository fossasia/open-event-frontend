import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  sponsorsColumns: [
    {
      propertyName   : 'logo-url',
      template       : 'components/ui-table/cell/cell-image',
      title          : 'Logo',
      disableSorting : true
    },
    {
      propertyName : 'name',
      title        : 'Name'
    },
    {
      propertyName   : 'type',
      title          : 'Type',
      disableSorting : true
    },
    {
      propertyName : 'level',
      title        : 'Level'
    },
    {
      title          : 'Options',
      template       : 'components/ui-table/cell/cell-sponsor-options',
      disableSorting : true
    }
  ]
});
