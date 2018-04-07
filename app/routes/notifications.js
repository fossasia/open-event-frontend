import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.get('l10n').t('Notifications');
  },
  model() {
    return this.get('authManager.currentUser').get('notifications').filterBy('isRead', false);
  },
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
