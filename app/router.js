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
});

export default router;
