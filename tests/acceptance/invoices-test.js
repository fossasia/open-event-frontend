import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';


module('Acceptance | account/billing-info/invoices', function(hooks) {
  setupApplicationTest(hooks);


  test('visiting account/billing-info/invoices login', async function(assert) {
    await visit('account/billing-info/invoices');
    assert.equal(currentURL(), 'account/billing-info/invoices');
  });
});