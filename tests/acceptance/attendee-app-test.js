import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';

module('Acceptance | attendee-app', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /landing-attendee-app without login', async function(assert) {
    await visit('/attendee-app');
    assert.equal(currentURL(), '/attendee-app');
  });

  test('visiting /landing-attendee-app with login', async function(assert) {
    await login(assert);
    await visit('/attendee-app');
    assert.equal(currentURL(), '/attendee-app');
  });
});
