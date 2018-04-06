import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  title(tokens) {
    if (!tokens) {
      tokens = [];
    }

    tokens.reverse().push(this.get('config.appName'));
    return tokens.join(' | ');
  },

  async beforeModel() {
    this._super(...arguments);
    await this.get('authManager').initialize();
  },

  model() {
    let notifications = [];
    if (this.get('session.isAuthenticated')) {
      notifications = this.get('authManager.currentUser').query('notifications', {
        filter: [
          {
            name : 'is-read',
            op   : 'eq',
            val  : false
          }
        ],
        sort: '-received-at'
      });
    }
    return RSVP.hash({
      notifications,
      pages: this.get('store').query('page', {
        sort: 'index'
      }),
      socialLinks: this.get('store').queryRecord('setting', {})
    });
  },

  sessionInvalidated() {
    if (!this.get('session.skipRedirectOnInvalidation')) {
      this._super(...arguments);
    }
  }
});
