import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { merge, values, isEmpty } from 'lodash-es';
import { hash } from 'rsvp';

@classic
export default class ApplicationRoute extends Route.extend(ApplicationRouteMixin) {
  @service
  session;

  @service
  currentUser;

  @service
  cache;

  title(tokens) {
    if (!tokens) {
      tokens = [];
    }

    tokens.reverse().push(this.settings.appName);
    return tokens.join(' | ');
  }

  async beforeModel(transition) {
    super.beforeModel(...arguments);
    await this.authManager.initialize();
    await this.settings.initialize();
    if (!transition.intent.url.includes('login') && !transition.intent.url.includes('reset-password')) {
      this.set('session.previousRouteName', transition.intent.url);
    } else {
      this.set('session.previousRouteName', null);
    }

    return this._loadCurrentUser();
  }

  async model() {
    return hash({
      cookiePolicy     : this.settings.cookiePolicy,
      cookiePolicyLink : this.settings.cookiePolicyLink,
      socialLinks      : this.settings
    });
  }

  sessionInvalidated() {
    if (!this.session.skipRedirectOnInvalidation) {
      super.sessionInvalidated(...arguments);
    }

    this.set('session.skipRedirectOnInvalidation', false);
  }

  async sessionAuthenticated() {
    await this.authManager.loadUser();
    await this._loadCurrentUser();
    const route = this.session.previousRouteName;
    if (route) {
      this.transitionTo(route);
    } else {
      super.sessionAuthenticated(...arguments);
    }
  }

  _loadCurrentUser() {
    return this.currentUser.load().catch(() => this.getsession.invalidate());
  }

  /**
   * Merge all params into one param.
   *
   * @param params
   * @return {*}
   * @private
   */
  _mergeParams(params) {
    return merge({}, ...values(params));
  }

  @action
  willTransition(transition) {
    transition.then(() => {
      const params = this._mergeParams(transition.params);
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
