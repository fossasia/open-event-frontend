import { observer, computed } from '@ember/object';
import Service, { inject as service } from '@ember/service';
import { camelize } from '@ember/string';
import { mapKeys } from 'lodash-es';

export default Service.extend({

  session : service(),
  metrics : service(),
  store   : service(),

  currentUser: computed('session.data.currentUserFallback.id', 'currentUserModel', function() {
    if (this.currentUserModel) {
      return this.currentUserModel;
    }

    if (this.get('session.data.currentUserFallback')) {
      let userModel = this.store.peekRecord('user', this.get('session.data.currentUserFallback.id'));
      if (!userModel) {
        return this.restoreCurrentUser();
      }

      return userModel;
    }

    return null;
  }),

  userAuthenticatedStatusChange: observer('session.isAuthenticated', function() {
    if (!this.get('session.isAuthenticated')) {
      this.identifyStranger();
    }
  }),

  currentUserChangeListener: observer('currentUser', function() {
    if (this.currentUser && this.get('session.isAuthenticated')) {
      this.identify();
    }
  }),

  getTokenPayload() {
    const token = this.get('session.session.content.authenticated.access_token');
    if (token && token !== '') {
      return JSON.parse(atob(token.split('.')[1]));
    }

    return null;
  },

  logout() {
    this.session.invalidate();
    this.set('currentUserModel', null);
    this.session.set('data.currentUserFallback', null);
  },

  identify() {
    if (this.currentUser) {
      this.metrics.identify({
        distinctId : this.currentUser.id,
        email      : this.currentUser.email
      });
    }
  },

  identifyStranger() {
    this.metrics.identify(null);
  },

  persistCurrentUser(user = null) {
    if (!user) {
      user = this.currentUserModel;
    } else {
      this.set('currentUserModel', user);
    }

    let userData = user.serialize(false).data.attributes;
    userData.id = user.get('id');
    this.session.set('data.currentUserFallback', userData);
  },

  restoreCurrentUser(data = null) {
    if (!data) {
      data = this.get('session.data.currentUserFallback', {});
    }

    const userId = data.id;
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
    let userModel = this.store.peekRecord('user', userId);
    this.set('currentUserModel', userModel);
    return userModel;
  },

  async initialize() {
    if (this.get('session.isAuthenticated')) {
      if (this.get('session.data.currentUserFallback.id')) {
        try {
          const user = await this.store.findRecord('user', this.get('session.data.currentUserFallback.id'));
          this.set('currentUserModel', user);
          this.identify();
        } catch (e) {
          console.warn(e);
          this.session.invalidate();
          this.notify.error(this.l10n.t('An unexpected error has occurred'));
        }

      } else {
        this.identifyStranger();
      }
    } else {
      this.identifyStranger();
    }
  }
});
