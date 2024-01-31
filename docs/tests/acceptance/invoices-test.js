import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';


module('Acceptance | account/billing/invoices', function(hooks) {
  setupApplicationTest(hooks);


  test('visiting account/billing/invoices without login', async function(assert) {
    await visit('account/billing/invoices');
    assert.equal(currentURL(), '/login');
  });

  test('visiting account/billing/invoices with login', async function(assert) {
    await login(assert);
    await visit('/account/billing/invoices');
    assert.equal(currentURL(), '/account/billing/invoices/all');
  });
});
