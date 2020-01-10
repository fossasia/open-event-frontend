import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';
import { merge, values, isEmpty } from 'lodash-es';

export default Route.extend(ApplicationRouteMixin, {
  session     : service(),
  currentUser : service(),

  title(tokens) {
    if (!tokens) {
      tokens = [];
    }

    tokens.reverse().push(this.get('settings.appName'));
    return tokens.join(' | ');
  },

  async beforeModel(transition) {
    this._super(...arguments);
    await this.authManager.initialize();
    await this.settings.initialize();
    if (!transition.intent.url.includes('login') && !transition.intent.url.includes('reset-password')) {
      this.set('session.previousRouteName', transition.intent.url);
    } else {
      this.set('session.previousRouteName', null);
    }

    return this._loadCurrentUser();
  },

  async model() {
    let notifications = [];
    if (this.get('session.isAuthenticated')) {
      try {
        notifications = await this.authManager.currentUser.query('notifications', {
          filter: [
            {
              name : 'is-read',
              op   : 'eq',
              val  : false
            }
          ],
          sort: '-received-at'
        });
      } catch (e) {
        console.warn(e);
        this.session.invalidate();
      }
    }


    return {
      notifications,
      pages: await this.store.query('page', {
        sort: 'index'
      }),
      cookiePolicy     : this.get('settings.cookiePolicy'),
      cookiePolicyLink : this.get('settings.cookiePolicyLink'),
      socialLinks      : await this.store.queryRecord('setting', {}),
      eventTypes       : await this.store.findAll('event-type'),
      eventLocations   : await this.store.findAll('event-location')
    };
  },

  sessionInvalidated() {
    if (!this.get('session.skipRedirectOnInvalidation')) {
      this._super(...arguments);
    }

    this.set('session.skipRedirectOnInvalidation', false);
  },

  async sessionAuthenticated() {
    let { _super } = this;
    await this._loadCurrentUser();
    _super.call(this, ...arguments);
  },

  _loadCurrentUser() {
    return this.currentUser.load().catch(() => this.getsession.invalidate());
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
        if (!url.includes('login') && !url.includes('reset-password')) {
          this.set('session.previousRouteName', url);
        } else {
          this.set('session.previousRouteName', null);
        }
      });
    }
  }
});
