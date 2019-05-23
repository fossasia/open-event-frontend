import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';

module('Acceptance | organizer-app', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /landing-organizer-app without login', async function(assert) {
    await visit('/organizer-app');
    assert.equal(currentURL(), '/organizer-app');
  });

  test('visiting /landing-organizer-app with login', async function(assert) {
    await login(assert);
    await visit('/organizer-app');
    assert.equal(currentURL(), '/organizer-app');
  });
});
