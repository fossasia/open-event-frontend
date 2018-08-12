import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    markAsRead(notification) {
      notification.set('isRead', true);
      notification.save()
        .then(() => {
          this.get('notify').success(this.get('l10n').t('Marked as Read successfully'));
        })
        .catch(() => {
          this.get('notify').error(this.get('l10n').t('An unexpected error occurred.'));
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
          this.get('notify').success(this.get('l10n').t('Marked all as Read successfully'));
        })
        .catch(() => {
          this.get('notify').error(this.get('l10n').t('An unexpected error occurred.'));
        });
    }
  }
});
