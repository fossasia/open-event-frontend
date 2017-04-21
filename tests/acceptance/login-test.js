import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';
import { currentSession } from 'open-event-frontend/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | login');

test('visiting /login', function(assert) {
  visit('/login');
  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('correct login at /login', function(assert) {
  login(assert);
  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('incorrect login at /login', function(assert) {
  login(assert, 'wrong_user@gmail.com', 'wrong_password');
  andThen(function() {
    assert.equal(currentURL(), '/login');
    const errorMessageDiv = findWithAssert('.ui.negative.message');
    assert.equal(errorMessageDiv[0].textContent.trim(), 'Your credentials were incorrect.');
  });
});

test('logout at /logout', function(assert) {
  login(assert);
  andThen(() => {
    assert.equal(currentURL(), '/');
    assert.ok(currentSession(this.application).session.isAuthenticated);
    logout(assert);
  });
});

test('logout via navbar', function(assert) {
  login(assert);
  andThen(() => {
    assert.equal(currentURL(), '/');
    assert.ok(currentSession(this.application).session.isAuthenticated);
    click('a.logout-button');
    andThen(() => {
      assert.equal(currentURL(), '/');
      assert.ok(currentSession(this.application).session.isAuthenticated !== true);
    });
  });
});
