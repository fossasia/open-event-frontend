import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';

module('Acceptance | events', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /events/live without login', async function(assert) {
    await visit('/events/live');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /events/draft without login', async function(assert) {
    await visit('/events/draft');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /events/past without login', async function(assert) {
    await visit('/events/past');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /events/import without login', async function(assert) {
    await visit('/events/import');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /events/live with login', async function(assert) {
    await login(assert);
    await visit('/events/live');
    assert.equal(currentURL(), '/events/live');
  });

  test('visiting /events/draft with login', async function(assert) {
    await login(assert);
    await visit('/events/draft');
    assert.equal(currentURL(), '/events/draft');
  });

  test('visiting /events/past with login', async function(assert) {
    await login(assert);
    await visit('/events/past');
    assert.equal(currentURL(), '/events/past');
  });

  test('visiting /events/past with login', async function(assert) {
    await login(assert);
    await visit('/events/past');
    assert.equal(currentURL(), '/events/past');
  });
});
