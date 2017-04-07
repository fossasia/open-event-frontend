import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  title(tokens) {
    if (!tokens) {
      tokens = [];
    }
    tokens.push(this.get('config.appName'));
    return tokens.join(' | ');
  },

  sessionInvalidated() {
    if (!this.get('session.skipRedirectOnInvalidation')) {
      this._super(...arguments);
    }
  }
});
