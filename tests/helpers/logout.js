import Ember from 'ember';
import { currentSession } from 'open-event-frontend/tests/helpers/ember-simple-auth';

const { Test } = Ember;

export default Test.registerAsyncHelper('logout', function(app, assert) {
  visit('/logout');
  andThen(() => {
    assert.equal(currentURL(), '/');
    assert.ok(currentSession(app).session.isAuthenticated !== true);
  });
});
