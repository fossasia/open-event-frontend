import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.l10n.t('Notifications');
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
          this.get('notify').success(this.l10n.t('All notifications marked read successfully'));
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('An unexpected error occurred.'));
        });
    }
  }
});
