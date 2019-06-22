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
      subject  : 'emailSubject',
      message  : 'emailMessage',
      title    : 'Email Message',
      template : 'components/ui-table/cell/cell-title-message'
    },
    {
      subject  : 'notificationTitle',
      message  : 'notificationMessage',
      title    : 'Notification Message',
      template : 'components/ui-table/cell/cell-title-message'
    },
    {
      title    : 'Options',
      template : 'components/ui-table/cell/admin/messages/cell-options'
    },
    {
      title    : 'Threshold [Msg/Hr]',
      template : 'components/ui-table/cell/admin/messages/cell-threshold'
    },
    {
      propertyName : 'sentAt',
      title        : 'Time/Date sent out',
      template     : 'components/ui-table/cell/cell-simple-date',
      dateFormat   : 'MMMM DD, YYYY - HH:mm A'
    }
  ]
});
