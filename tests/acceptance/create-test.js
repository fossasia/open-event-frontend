import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';

module('Acceptance | create', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /create without login', async function(assert) {
    await visit('/create');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /create with login redirect', async function(assert) {
    await visit('/create');
    assert.equal(currentURL(), '/login');
    await login(assert, null, null, false);
    assert.equal(currentURL(), '/create');
  });


  test('visiting /create with login', async function(assert) {
    await login(assert);
    await visit('/create');
    assert.equal(currentURL(), '/create');
  });
});
