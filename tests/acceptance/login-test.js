import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';
import { currentSession } from 'open-event-frontend/tests/helpers/ember-simple-auth';
import { click, currentURL, visit, findWithAssert } from '@ember/test-helpers';

moduleForAcceptance('Acceptance | login');

test('visiting /login', async function(assert) {
  await visit('/login');
  assert.equal(currentURL(), '/login');
});

test('correct login at /login', async function(assert) {
  await login(assert);
  assert.equal(currentURL(), '/');
});

test('incorrect login at /login', async function(assert) {
  await login(assert, 'wrong_user@gmail.com', 'wrong_password');
  assert.equal(currentURL(), '/login');
  const errorMessageDiv = findWithAssert('.ui.negative.message');
  assert.equal(errorMessageDiv[0].textContent.trim(), 'Your credentials were incorrect.');
});

test('logout at /logout', async function(assert) {
  await login(assert);
  assert.equal(currentURL(), '/');
  assert.ok(currentSession(this.application).session.isAuthenticated);
  await logout(assert);
});

test('logout via navbar', async function(assert) {
  await login(assert);
  assert.equal(currentURL(), '/');
  assert.ok(currentSession(this.application).session.isAuthenticated);
  await click('a.logout-button');
  assert.equal(currentURL(), '/');
  assert.ok(currentSession(this.application).session.isAuthenticated !== true);
});

test('visiting /login after login', async function(assert) {
  await login(assert);
  await visit('/login');
  assert.equal(currentURL(), '/');
});
