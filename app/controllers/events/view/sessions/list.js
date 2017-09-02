import Ember from 'ember';

const { Controller } = Ember;
export default Controller.extend({
  columns: [
    {
      propertyName   : 'state',
      title          : 'State',
      disableSorting : true,
      template       : 'components/ui-table/cell/events/view/sessions/cell-session-state'
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
      propertyName   : 'shortAbstract',
      title          : 'Short Abstract',
      disableSorting : true
    },
    {
      propertyName : 'submitted-at',
      template     : 'components/ui-table/cell/cell-simple-date',
      title        : 'Submission Date'
    },
    {
      propertyName : 'last-modified',
      title        : 'Last Modified'
    },
    {
      propertyName   : 'is-mail-sent',
      title          : 'Email Sent',
      template       : 'components/ui-table/cell/events/view/sessions/cell-is-mail-sent',
      disableSorting : true
    },
    {
      template         : 'components/ui-table/cell/cell-simple-buttons',
      disableSorting   : true,
      disableFiltering : true
    },
    {
      template         : 'components/ui-table/cell/events/view/sessions/cell-buttons',
      title            : 'Actions',
      disableSorting   : true,
      disableFiltering : true
    }
  ]
});
