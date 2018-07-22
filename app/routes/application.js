import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';
import { merge, values, isEmpty } from 'lodash';

export default Route.extend(ApplicationRouteMixin, {
  session: service(),
  title(tokens) {
    if (!tokens) {
      tokens = [];
    }

    tokens.reverse().push(this.get('settings.appName'));
    return tokens.join(' | ');
  },

  async beforeModel() {
    this._super(...arguments);
    await this.get('authManager').initialize();
    await this.get('settings').initialize();
  },

  async model() {
    let notifications = [];
    if (this.get('session.isAuthenticated')) {
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
      socialLinks      : await this.get('store').queryRecord('setting', {}),
      eventTypes       : await this.get('store').findAll('event-type'),
      cookiePolicy     : this.get('settings.cookiePolicy'),
      cookiePolicyLink : this.get('settings.cookiePolicyLink')
      // eventLocations: await this.get('store').query('event-location', {}),
    };
  },

  sessionInvalidated() {
    if (!this.get('session.skipRedirectOnInvalidation')) {
      this._super(...arguments);
    }
  },

  sessionAuthenticated() {
    if (this.get('session.previousRouteName')) {
      this.transitionTo(this.get('session.previousRouteName'));
    } else {
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

  actions: {
    willTransition(transition) {
      transition.then(() => {
        let params = this._mergeParams(transition.params);
        let url;

        // generate doesn't like empty params.
        if (isEmpty(params)) {
          url = transition.router.generate(transition.targetName);
        } else {
          url = transition.router.generate(transition.targetName, params);
        }
        // Do not save the url of the transition to login route.
        if (!url.includes('login')) {
          this.set('session.previousRouteName', url);
        }
      });
    }
  }
});
