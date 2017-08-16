import Ember from 'ember';
import { mapKeys } from 'lodash';

const { Service, computed, observer, inject: { service }, String: { camelize }, RSVP } = Ember;

export default Service.extend({

  session : service(),
  metrics : service(),
  store   : service(),

  currentUser: computed('session.data.currentUserFallback.id', 'currentUserModel', function() {
    if (this.get('currentUserModel')) {
      return this.get('currentUserModel');
    }
    if (this.get('session.data.currentUserFallback')) {
      let userModel = this.get('store').peekRecord('user', this.get('session.data.currentUserFallback.id'));
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
    if (this.get('currentUser') && this.get('session.isAuthenticated')) {
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
    this.get('session').invalidate();
    this.set('currentUserModel', null);
    this.get('session').set('data.currentUserFallback', null);
  },

  identify() {
    let currentUser = this.get('currentUser');
    if (currentUser) {
      this.get('metrics').identify({
        distinctId : currentUser.id,
        email      : currentUser.email
      });
    }
  },

  identifyStranger() {
    this.get('metrics').identify(null);
  },

  persistCurrentUser(user = null) {
    if (!user) {
      user = this.get('currentUserModel');
    } else {
      this.set('currentUserModel', user);
    }
    let userData = user.serialize(false).data.attributes;
    userData.id = user.get('id');
    this.get('session').set('data.currentUserFallback', userData);
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
    this.get('store').push({
      data: {
        id         : userId,
        type       : 'user',
        attributes : data
      }
    });
    let userModel = this.get('store').peekRecord('user', userId);
    this.set('currentUserModel', userModel);
    return userModel;
  },

  initialize() {
    return new RSVP.Promise((resolve, reject) => {
      if (this.get('session.isAuthenticated')) {
        if (this.get('session.data.currentUserFallback.id')) {
          this.get('store')
            .findRecord('user', this.get('session.data.currentUserFallback.id'))
            .then(user => {
              this.set('currentUserModel', user);
              this.identify();
              resolve(user);
            })
            .catch(reject);
        } else {
          this.identifyStranger();
          resolve();
        }
      } else {
        this.identifyStranger();
        resolve();
      }
    });
  }
});
