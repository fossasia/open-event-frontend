import { currentSession } from 'open-event-frontend/tests/helpers/ember-simple-auth';
import { registerAsyncHelper } from '@ember/test';

export default registerAsyncHelper('logout', function(app, assert) {
  visit('/logout');
  andThen(() => {
    assert.equal(currentURL(), '/');
    assert.ok(currentSession(app).session.isAuthenticated !== true);
  });
});
