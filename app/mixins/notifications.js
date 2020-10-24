import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    markAsRead(notification) {
      notification.set('isRead', true);
      notification.save()
        .then(() => {
          this.notify.success(this.l10n.t('Marked as Read successfully'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        });
    },
    markAllAsRead(notifications) {
      const bulkPromises = [];

      for (const notification of notifications ? notifications.toArray() : []) {
        notification.set('isRead', true);
        bulkPromises.push(notification.save());
      }

      Promise
        .all(bulkPromises)
        .then(() => {
          this.notify.success(this.l10n.t('Marked all as Read successfully'));
        })
        .catch(e => {
          console.error('Error while marking all notifications as read', e);
          this.notify.error(this.l10n.t('An unexpected error has occurred.'));
        });
    }
  }
});
