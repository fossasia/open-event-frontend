import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';

module('Acceptance | profile', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /profile without login', async function(assert) {
    await visit('/profile');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /profile with login', async function(assert) {
    await login(assert);
    await visit('/profile');
    assert.equal(currentURL(), '/profile');
  });
});
