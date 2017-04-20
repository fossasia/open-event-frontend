import Ember from 'ember';

const { Service, computed: { alias }, observer, inject: { service } } = Ember;

export default Service.extend({

  session : service(),
  metrics : service(),

  currentUser: alias('session.data.currentUser'),

  userAuthenticatedStatusChange: observer('session.isAuthenticated', function() {
    if (this.get('session.isAuthenticated')) {
      this.identify();
    } else {
      this.identifyStranger();
    }
  }),

  logout() {
    this.get('session').invalidate();
    this.get('session').set('data.currentUser', null);
  },

  identify() {
    /**
    let currentUser = this.get('currentUser');
    this.get('metrics').identify({
      distinctId : currentUser.id,
      email      : currentUser.email,
      mobile     : currentUser.mobile,
      name       : currentUser.name
    });
     **/
  },

  identifyStranger() {
    this.get('metrics').identify(null);
  },

  init() {
    this._super.call(this);
    if (this.get('session.isAuthenticated')) {
      this.identify();
    } else {
      this.identifyStranger();
    }
  }

});
