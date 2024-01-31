import { click, fillIn, currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';

module('Acceptance | register', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /register', async function(assert) {
    await visit('/register');
    assert.equal(currentURL(), '/register');
  });

  test('visiting /register and registering with existing user', async function(assert) {
    await visit('/register');
    assert.equal(currentURL(), '/register');
    await fillIn('input[name=email]', 'opev_test_user@nada.email');
    await fillIn('input[name=password]', 'opev_test_user');
    await fillIn('input[name=password_repeat]', 'opev_test_user');
    await click('button[type=submit]');
    assert.equal(currentURL(), '/register');
  });

  test('visiting /register after login', async function(assert) {
    await login(assert);
    await visit('/register');
    assert.equal(currentURL(), '/');
  });
});
