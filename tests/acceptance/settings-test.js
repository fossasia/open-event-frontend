import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';

module('Acceptance | settings', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /settings/applications without login', async function(assert) {
    await visit('/settings/applications');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /settings/contact-info without login', async function(assert) {
    await visit('/settings/contact-info');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /settings/password without login', async function(assert) {
    await visit('/settings/password');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /settings/email-preferences without login', async function(assert) {
    await visit('/settings/email-preferences');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /settings/contact-info with login', async function(assert) {
    await login(assert);
    await visit('/settings/contact-info');
    assert.equal(currentURL(), '/settings/contact-info');
  });

  test('visiting /settings/password with login', async function(assert) {
    await login(assert);
    await visit('/settings/password');
    assert.equal(currentURL(), '/settings/password');
  });

  test('visiting /settings/email-preferences with login', async function(assert) {
    await login(assert);
    await visit('/settings/email-preferences');
    assert.equal(currentURL(), '/settings/email-preferences');
  });

  test('visiting /settings/applications with login', async function(assert) {
    await login(assert);
    await visit('/settings/applications');
    assert.equal(currentURL(), '/settings/applications');
  });
});
