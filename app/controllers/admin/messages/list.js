import Controller from '@ember/controller';

export default Controller.extend({
  columns: [
    {
      propertyName : 'recipient',
      title        : 'Recipients'
    },
    {
      propertyName : 'action',
      title        : 'Trigger'
    },
    {
      propertyName : 'email',
      title        : 'Email Message',
      template     : 'components/ui-table/cell/admin/messages/cell-email-sanitize'
    },
    {
      propertyName : 'notification',
      title        : 'Notification Message',
      template     : 'components/ui-table/cell/admin/messages/cell-notification-sanitize'
    },
    {
      title    : 'Options',
      template : 'components/ui-table/cell/admin/messages/cell-options'
    },
    {
      propertyName : 'sentAt',
      title        : 'Time/Date sent out',
      template     : 'components/ui-table/cell/cell-simple-date',
      dateFormat   : 'MMMM DD, YYYY - HH:mm A'
    }
  ]
});
