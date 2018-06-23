import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { merge, values, cloneDeep } from 'lodash';

export default Route.extend(ApplicationRouteMixin, {
  title(tokens) {
    if (!tokens) {
      tokens = [];
    }

    tokens.reverse().push(this.get('settings.appName'));
    return tokens.join(' | ');
  },

  async beforeModel(transition) {
    this._super(...arguments);
    this._rememberTransition(transition);
    await this.get('authManager').initialize();
    await this.get('settings').initialize();
  },

  async model() {
    let notifications = [];
    if (this.get('session.isAuthenticated') && this.get('authManager.currentUser')) {
      notifications = await this.get('authManager.currentUser').query('notifications', {
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
    return {
      notifications,
      pages: await this.get('store').query('page', {
        sort: 'index'
      }),
      socialLinks: await this.get('store').queryRecord('setting', {})
    };
  },

  sessionInvalidated() {
    if (!this.get('session.skipRedirectOnInvalidation')) {
      this._super(...arguments);
    }
  },

  /**
   * Merge all params into one param.
   *
   * @param params
   * @return {*}
   * @private
   */
  _mergeParams(params) {
    return merge({}, ...values(params));
  },

  /**
   * Fix transition object by adding missing properties to make everything play nice with nested routes
   *
   * @param transition
   * @return {*}
   * @private
   */
  _fixTransition(transition) {
    for (const property of ['params', 'queryParams']) {
      transition[property] = cloneDeep(transition[property]);
      transition[property][transition.targetName] = this._mergeParams(transition[property]);
      transition.intent[property] = cloneDeep(transition[property]);
    }
    return transition;
  },

  /**
   * Remember the given transition for future use
   * @param transition
   * @private
   */
  _rememberTransition(transition) {
    if (!['login', 'register'].includes(transition.targetName)) {
      this.set('session.attemptedTransition', this._fixTransition(transition));
    }
  },

  actions: {
    willTransition(transition) {
      this._rememberTransition(transition);
    }
  }
});
