import { click, fillIn, currentURL, visit } from '@ember/test-helpers';
import { currentSession } from 'ember-simple-auth/test-support';

export async function login(assert, email = null, password = null, gotoLoginPage = true) {
  if (gotoLoginPage) {
    await visit('/login');
  }
  assert.equal(currentURL(), '/login');
  await fillIn('input[name=email]', email !== null ? email : 'opev_test_user@nada.email');
  await fillIn('input[name=password]', password !== null ? password : 'opev_test_user');
  await click('button[type=submit]');
}

export async function logout(assert) {
  await visit('/logout');
  assert.equal(currentURL(), '/');
  assert.ok(currentSession().session.isAuthenticated !== true);
}
