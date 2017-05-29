import Ember from 'ember';

const { Controller, String } = Ember;
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
      title        : 'Public URL',
      class        : 'hide'
    },
    {
      template : 'components/ui-table/cell/cell-buttons',
      title    : ''
    }

  ],
  data: [{
    name     : 'Event_Name',
    date     : String.htmlSafe('<span>March 20, 2016 - 05:30 PM <br> To  <br>\n March 20, 2016 - 05:30 PM</span>'),
    startAt  : 'March 20, 2016 - 05:30 PM',
    endAt    : 'March 20, 2016 - 05:30 PM',
    roles    : 'sample@gmail.com (Organizer)',
    tickets  : String.htmlSafe(''),
    sessions : String.htmlSafe(''),
    speakers : '2',
    url      : String.htmlSafe('<a href="">url here</a>'),
    links    : String.htmlSafe('HELLO'),
    image    : 'http://placehold.it/200x200'
  },
  {
    name     : 'Event_Name2',
    date     : String.htmlSafe('<span>March 20, 2016 - 05:30 PM <br> To  <br>\n March 20, 2016 - 05:30 PM</span>'),
    startAt  : 'March 20, 2015 - 05:30 PM',
    endAt    : 'March 20, 2016 - 05:30 PM',
    roles    : 'sample@gmail.com (Organizer)',
    tickets  : String.htmlSafe(''),
    sessions : String.htmlSafe(''),
    speakers : '2',
    url      : String.htmlSafe('<a href="">url here</a>'),
    links    : String.htmlSafe('HELLO'),
    image    : 'http://placehold.it/200x200'
  }]
});
