import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames : ['notification item'],
  tagName    : 'a',
  didInsertElement() {
    this._super.call(this);
    this.$().popup({
      popup : '.popup',
      on    : 'click'
    });
  },
  willDestroyElement() {
    this._super.call(this);
    this.$().popup('destroy');
  },
  actions: {
    markRead(notification) {
      notification.set('isRead', true);
      notification.save()
        .then(() => {
          this.get('notify').success(this.l10n.t('Marked as Read successfully'));
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('An unexpected error occured.'));
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
