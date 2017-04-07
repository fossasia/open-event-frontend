import Ember from 'ember';
import config from 'open-event-frontend/config/environment';

const { Router } = Ember;

const router = Router.extend({
  location : config.locationType,
  rootURL  : config.rootURL
});

router.map(function() {

});

export default router;
