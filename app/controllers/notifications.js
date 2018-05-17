import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    markAllRead() {
      this.get('authManager.currentUser').get('notifications')
        .then(data => {
          data.forEach(item => {
            if (!item.get('isRead')) {
              item.set('isRead', true);
              item.save();
            }
          });
          this.get('notify').success(this.get('l10n').t('All notifications marked read successfully'));
        })
        .catch(() => {
          this.get('notify').error(this.get('l10n').t('An unexpected error occurred.'));
        });
    }
  }
});
