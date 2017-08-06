import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, RSVP } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  title(tokens) {
    if (!tokens) {
      tokens = [];
    }

    tokens.reverse().push(this.get('config.appName'));
    return tokens.join(' | ');
  },

  beforeModel() {
    this._super(...arguments);
    this.get('authManager').initialize();
  },
  model() {
    if (this.get('session.isAuthenticated')) {
      return new RSVP.Promise((resolve, reject) => {
        this.store.findRecord('user', this.get('authManager.currentUser.id'), { reload: true })
          .then(user => {
            user.query('notifications', {
              filter: [
                {
                  name : 'is-read',
                  op   : 'eq',
                  val  : false
                }
              ]
            }).then(resolve).catch(reject);
          })
          .catch(reject);
      });
    }
  },
  sessionInvalidated() {
    if (!this.get('session.skipRedirectOnInvalidation')) {
      this._super(...arguments);
    }
  }
});
