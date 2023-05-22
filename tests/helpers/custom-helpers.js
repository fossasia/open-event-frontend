import { click, fillIn, currentURL, visit, settled } from '@ember/test-helpers';
import { currentSession } from 'ember-simple-auth/test-support';

export async function login(assert, email = null, password = null, gotoLoginPage = true) {
  if (gotoLoginPage) {
    await visit('/login');
  }
  assert.equal(currentURL(), '/login');
  await fillIn('input[name=email]', email !== null ? email : 'opev-fe@test.com');
  await fillIn('input[name=password]', password !== null ? password : 'test-fe-user');
  await click('button[type=submit]');
  await settled();
}

export async function logout(assert) {
  await visit('/logout');
  await settled();
  assert.equal(currentURL(), '/');
  assert.ok(currentSession().session.isAuthenticated !== true);
}
