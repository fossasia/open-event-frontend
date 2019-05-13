import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';

module('Acceptance | explore', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /explore without login', async function(assert) {
    await visit('/explore');
    assert.equal(currentURL(), '/explore');
  });

  test('visiting /explore with login', async function(assert) {
    await login(assert);
    await visit('/explore');
    assert.equal(currentURL(), '/explore');
  });
});
