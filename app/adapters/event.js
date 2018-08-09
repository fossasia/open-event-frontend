import ApplicationAdapter from './application';
import ENV from 'open-event-frontend/config/environment';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default ApplicationAdapter.extend({

  router: inject(),

  headers: computed('session.data.authenticated', 'router.currentRouteName', function() {
    const headers = {
      'Content-Type': 'application/vnd.api+json'
    };
    if (!this.get('router.currentRouteName').startsWith('public.')) {
      const { access_token } = this.get('session.data.authenticated');
      if (access_token) {
        headers[ENV['ember-simple-auth-token'].authorizationHeaderName] = ENV['ember-simple-auth-token'].authorizationPrefix + access_token;
      }
    }
    return headers;
  })
});
