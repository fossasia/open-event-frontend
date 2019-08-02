import Controller from '@ember/controller';
import { computed } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
per_page = 100;

sort_by = 'time';

sort_dir = 'ASC';

@computed()
get columns() {
  return [
    {
      name            : 'Recipients',
      valuePath       : 'recipient',
      headerComponent : 'tables/headers/sort',
      isSortable      : true
    },
    {
      name      : 'Trigger',
      valuePath : 'action'
    },
    {
      name      : 'Email Message',
      valuePath : 'emailMessage',

      cellComponent   : 'ui-table/cell/cell-title-message',
      extraValuePaths : ['emailSubject', 'emailMessage'],
      options         : {
        subject : 'emailSubject',
        message : 'emailMessage'
      }
    },
    {
      name            : 'Notification Message',
      valuePath       : 'notificationMessage',
      cellComponent   : 'ui-table/cell/cell-title-message',
      extraValuePaths : ['notificationTitle', 'notificationMessage'],
      options         : {
        subject : 'notificationTitle',
        message : 'notificationMessage'
      }
    },
    {
      name          : 'Options',
      valuePath     : 'option',
      cellComponent : 'ui-table/cell/admin/messages/cell-options'
    },
    {
      name            : 'Time/Date Sent Out',
      valuePath       : 'sentAt',
      headerComponent : 'tables/headers/sort',
      isSortable      : true,
      cellComponent   : 'ui-table/cell/cell-simple-date',
      options         : {
        dateFormat: 'MMMM DD, YYYY - HH:mm A'
      }
    }

  ];
}
}

