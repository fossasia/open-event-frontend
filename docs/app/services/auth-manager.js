import classic from 'ember-classic-decorator';
import { observes } from '@ember-decorators/object';
import { computed } from '@ember/object';
import Service, { inject as service } from '@ember/service';
import { camelize } from '@ember/string';
import { mapKeys } from 'lodash-es';

@classic
export default class AuthManagerService extends Service {
  @service
  session;

  @service
  metrics;

  @service
  store;

  @service
  bugTracker;

  @computed('session.data.currentUserFallback.id', 'currentUserModel')
  get currentUser() {
    if (this.currentUserModel) {
      return this.currentUserModel;
    }

    if (this.session.data.currentUserFallback) {
      const userModel = this.store.peekRecord('user', this.session.data.currentUserFallback.id);
      if (!userModel) {
        return this.restoreCurrentUser();
      }

      return userModel;
    }

    return null;
  }

  @observes('session.isAuthenticated')
  userAuthenticatedStatusChange() {
    if (!this.session.isAuthenticated) {
      this.identifyStranger();
    }
  }

  @observes('currentUser')
  currentUserChangeListener() {
    if (this.currentUser && this.session.isAuthenticated) {
      this.identify();
    }
  }

  getTokenPayload() {
    const token = this.session.session.content.authenticated.access_token;
    if (token && token !== '') {
      return JSON.parse(atob(token.split('.')[1]));
    }

    return null;
  }

  logout(skipInvalidate) {
    if (!skipInvalidate) {
      this.session.invalidate();
    }
    this.set('currentUserModel', null);
    this.session.set('data.currentUserFallback', null);
  }

  identify() {
    if (this.currentUser) {
      this.metrics.identify({
        distinctId : this.currentUser.id,
        email      : this.currentUser.email
      });
      this.bugTracker.setUser({
        id    : this.currentUser.id,
        email : this.currentUser.email
      });
    }
  }

  identifyStranger() {
    this.metrics.identify(null);
    this.bugTracker.clearUser();
  }

  async loadUser() {
    if (this.currentUserModel) {
      return this.currentUserModel;
    }

    const tokenPayload = this.getTokenPayload();
    if (tokenPayload) {
      this.persistCurrentUser(
        await this.store.findRecord('user', tokenPayload.identity)
      );
    }

    return this.currentUserModel;
  }

  persistCurrentUser(user = null) {
    if (!user) {
      user = this.currentUserModel;
    } else {
      this.set('currentUserModel', user);
    }

    const userData = user.serialize(false).data.attributes;
    userData.id = user.get('id');
    userData.details = null;
    this.session.set('data.currentUserFallback', userData);
  }

  restoreCurrentUser(data = null) {
    if (!data) {
      data = this.get('session.data.currentUserFallback', {});
    }

    const userId = data.id;
    if (!userId) {
      return null;
    }
    delete data.id;
    data = mapKeys(data, (value, key) => camelize(key));
    if (!data.email) {
      data.email = null;
    }

    this.store.push({
      data: {
        id         : userId,
        type       : 'user',
        attributes : data
      }
    });
    const userModel = this.store.peekRecord('user', userId);
    this.set('currentUserModel', userModel);
    return userModel;
  }

  async initialize() {
    if (this.session.isAuthenticated) {
      if (this.session.data.currentUserFallback?.id) {
        try {
          const user = await this.store.findRecord('user', this.session.data.currentUserFallback.id);
          this.set('currentUserModel', user);
          this.identify();
        } catch (e) {
          console.warn(e);
          this.logout();
        }
      } else {
        this.identifyStranger();
        this.logout();
      }
    } else {
      this.identifyStranger();
      this.logout(true);
    }
  }
}
