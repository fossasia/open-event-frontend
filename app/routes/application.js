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

    let notificationsPromise = Promise.resolve([]);
    if (this.get('session.isAuthenticated')) {
      try {
        notificationsPromise = this.authManager.currentUser.query('notifications', {
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

    const pagesPromise = this.store.query('page', {
      sort: 'index'
    });

    const settingsPromise = this.store.queryRecord('setting', {});
    const eventTypesPromise = this.store.findAll('event-type');
    const eventLocationsPromise = this.store.findAll('event-location');

    const [notifications, pages, settings, eventTypes, eventLocations] = await Promise.all([
      notificationsPromise,
      pagesPromise,
      settingsPromise,
      eventTypesPromise,
      eventLocationsPromise]);

    return {
      notifications,
      pages,
      cookiePolicy     : settings.cookiePolicy,
      cookiePolicyLink : settings.cookiePolicyLink,
      socialLinks      : settings,
      eventTypes,
      eventLocations
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
    await this.authManager.loadUser();
    await this._loadCurrentUser();
    const route = this.session.previousRouteName;
    if (route) {
      this.transitionTo(route);
    } else {
      _super.call(this, ...arguments);
    }
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
        }
      });
    }
  }
});
