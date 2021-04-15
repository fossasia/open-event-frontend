import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | notifications', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /notifications without login', async function(assert) {
    await visit('/notifications');
    assert.equal(currentURL(), '/login');
  });
});
