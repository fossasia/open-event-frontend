import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';


module('Acceptance | account/billing-info', function(hooks) {
  setupApplicationTest(hooks);


  test('visiting account/billing-info without login', async function(assert) {
    await visit('account/billing-info');
    assert.equal(currentURL(), '/login');
  });

  test('visiting account/billing-info with login', async function(assert) {
    await login(assert);
    await visit('account/billing-info');
    assert.equal(currentURL(), 'account/billing-info');
  });
});