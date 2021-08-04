import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class NotificationsController extends Controller {
  @action
  markAllRead() {
    this.authManager.currentUser.get('notifications')
      .then(data => {
        data.forEach(item => {
          if (!item.get('isRead')) {
            item.set('isRead', true);
            item.save();
          }
        });
        this.notify.success(this.l10n.t('All notifications marked read successfully'),
          {
            id: 'mark_read'
          });
      })
      .catch(() => {
        this.notify.error(this.l10n.t('An unexpected error has occurred.'),
          {
            id: 'mark_read_error'
          });
      });
  }
}
