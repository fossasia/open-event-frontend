import Ember from 'ember';
import config from 'open-event-frontend/config/environment';

const { Router } = Ember;

const router = Router.extend({
  location : config.locationType,
  rootURL  : config.rootURL
});

router.map(function() {
  this.route('not-found');
  this.route('not-found-catch', { path: '/*path' });
  this.route('login');
  this.route('register');
  this.route('logout');

  this.route('public', { path: '/e/:event_id' }, function() {

  });
  this.route('create');
});

export default router;
