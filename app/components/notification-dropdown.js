import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({
  classNames : ['notification item'],
  tagName    : 'a',
  didInsertElement() {
    this._super.call(this);
    $(this.element).popup({
      popup : '.popup',
      on    : 'click'
    });
  },
  willDestroyElement() {
    this._super.call(this);
    $(this.element).popup('destroy');
  },
  actions: {
    markRead(notification) {
      notification.set('isRead', true);
      notification.save()
        .then(() => {
          this.notify.success(this.l10n.t('Marked as Read successfully'), {
            id: 'not_read_succ'
          });
        })
        .catch(e => {
          console.error('Error while marking notifications as read.', e);
          this.notify.error(this.l10n.t('An unexpected error occurred.'), {
            id: 'not_read_error'
          });
        });
    },
    markAllRead() {
      this.get('authManager.currentUser').get('notifications')
        .then(data => {
          data.forEach(item => {
            if (!item.get('isRead')) {
              item.set('isRead', true);
              item.save();
            }
          });
        });
    }
  }
});
