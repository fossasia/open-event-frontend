import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  columns: [
    {
      propertyName : 'code',
      title        : 'Access Code'
    },
    {
      propertyName   : 'accessUrl',
      title          : 'Access Code URL',
      disableSorting : true
    },
    {
      propertyName : 'valid-till',
      title        : 'Validity',
      template     : 'components/ui-table/cell/cell-validity'
    },
    {
      propertyName : 'is-active',
      title        : 'Status',
      template     : 'components/ui-table/cell/cell-label'
    },
    {
      title            : 'Action',
      template         : 'components/ui-table/cell/cell-code-buttons',
      disableSorting   : true,
      disableFiltering : true
    }
  ]
});
