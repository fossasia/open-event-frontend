import Controller from '@ember/controller';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {
per_page = 100;

sort_dir = 'ASC';

get columns() {
  return [
    {
      name      : this.l10n.t('Recipients'),
      valuePath : 'recipient'
    },
    {
      name      : this.l10n.t('Trigger'),
      valuePath : 'action'
    },
    {
      name      : this.l10n.t('Email Message'),
      valuePath : 'emailMessage',

      cellComponent   : 'ui-table/cell/cell-title-message',
      extraValuePaths : ['emailSubject'],
      options         : {
        subject : 'emailSubject',
        message : 'emailMessage'
      }
    },
    {
      name            : this.l10n.t('Notification Message'),
      valuePath       : 'notificationMessage',
      cellComponent   : 'ui-table/cell/cell-title-message',
      extraValuePaths : ['notificationTitle'],
      options         : {
        subject : 'notificationTitle',
        message : 'notificationMessage'
      }
    },
    {
      name            : this.l10n.t('Options'),
      valuePath       : 'option',
      extraValuePaths : ['mailStatus', 'notificationStatus', 'userControlStatus'],
      cellComponent   : 'ui-table/cell/admin/messages/cell-options'
    },
    {
      name            : this.l10n.t('Time/Date Sent Out'),
      valuePath       : 'sentAt',
      headerComponent : 'tables/headers/sort',
      isSortable      : true,
      cellComponent   : 'ui-table/cell/cell-simple-date'
    }

  ];
}
}
