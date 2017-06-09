import Ember from 'ember';

const { Controller } = Ember;
export default Controller.extend({
  columns: [
    {
      propertyName : 'name',
      template     : 'components/ui-table/cell/cell-event',
      title        : 'Name'
    },
    {
      propertyName : 'startTime',
      template     : 'components/ui-table/cell/cell-date',
      title        : 'Date'
    },
    {
      propertyName : 'roles',
      template     : 'components/ui-table/cell/cell-roles',
      title        : 'Roles'
    },
    {
      propertyName : 'sessions',
      template     : 'components/ui-table/cell/cell-sessions',
      title        : 'Sessions'
    },
    {
      propertyName : 'speakers',
      title        : 'Speakers'
    },
    {
      propertyName : 'tickets',
      template     : 'components/ui-table/cell/cell-tickets',
      title        : 'Tickets'
    },
    {
      propertyName : 'url',
      template     : 'components/ui-table/cell/cell-link',
      title        : 'Public URL'
    },
    {
      template : 'components/ui-table/cell/cell-buttons',
      title    : ''
    }
  ]
});
