import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';

module('Acceptance | reset password', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /reset-password', async function(assert) {
    await visit('/reset-password');

    assert.equal(currentURL(), '/reset-password');
  });

  test('visiting /reset-password after login', async function(assert) {
    await login(assert);
    await visit('/reset-password');
    assert.equal(currentURL(), '/reset-password');
  });
});
