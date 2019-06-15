import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';


module('Acceptance | account/billing-info', function(hooks) {
  setupApplicationTest(hooks);


  test('visiting account/billing-info', async function(assert) {
    await visit('account/billing-info');
    assert.equal(currentURL(), 'account/billing-info');
  });
});