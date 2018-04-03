import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';
import { click, currentURL, fillIn, visit } from '@ember/test-helpers';

moduleForAcceptance('Acceptance | create');

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
