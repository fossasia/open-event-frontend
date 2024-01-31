import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';

module('Acceptance | my-sessions', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /my-sessions without login', async function(assert) {
    await visit('/my-sessions');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /my-sessions/upcoming without login', async function(assert) {
    await visit('/my-sessions/upcoming');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /my-sessions/past without login', async function(assert) {
    await visit('/my-sessions/past');
    assert.equal(currentURL(), '/login');
  });

  test('visiting /my-sessions with login', async function(assert) {
    await login(assert);
    await visit('/my-sessions');
    assert.equal(currentURL(), '/my-sessions/upcoming');
  });

  test('visiting /my-sessions/upcoming with login', async function(assert) {
    await login(assert);
    await visit('/my-sessions/upcoming');
    assert.equal(currentURL(), '/my-sessions/upcoming');
  });

  test('visiting /my-sessions/past with login', async function(assert) {
    await login(assert);
    await visit('/my-sessions/past');
    assert.equal(currentURL(), '/my-sessions/past');
  });
});
