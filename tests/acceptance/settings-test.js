import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';

module('Acceptance | account', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /account/applications without login', async function(assert) {
    await visit('/account/applications');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /account/profile without login', async function(assert) {
    await visit('/account/profile');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /account/password without login', async function(assert) {
    await visit('/account/password');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /account/email-preferences without login', async function(assert) {
    await visit('/account/email-preferences');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /account/profile with login', async function(assert) {
    await login(assert);
    await visit('/account/profile');
    assert.equal(currentURL(), '/account/profile');
  });

  test('visiting /account/password with login', async function(assert) {
    await login(assert);
    await visit('/account/password');
    assert.equal(currentURL(), '/account/password');
  });

  test('visiting /account/email-preferences with login', async function(assert) {
    await login(assert);
    await visit('/account/email-preferences');
    assert.equal(currentURL(), '/account/email-preferences');
  });

  test('visiting /account/applications with login', async function(assert) {
    await login(assert);
    await visit('/account/applications');
    assert.equal(currentURL(), '/account/applications');
  });
});
