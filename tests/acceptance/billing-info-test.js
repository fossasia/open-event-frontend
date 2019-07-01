import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';


module('Acceptance | account/billing', function(hooks) {
  setupApplicationTest(hooks);


  test('visiting account/billing without login', async function(assert) {
    await visit('account/billing');
    assert.equal(currentURL(), '/login');
  });

  test('visiting account/billing with login', async function(assert) {
    await login(assert);
    await visit('account/billing');
    assert.equal(currentURL(), '/account/billing/payment-info');
  });
});