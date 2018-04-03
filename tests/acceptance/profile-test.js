import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | profile');

test('visiting /profile without login', async function(assert) {
  visit('/profile');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /profile with login', async function(assert) {
  login(assert);
  andThen(function() {
    visit('/profile');
    andThen(function() {
      assert.equal(currentURL(), '/profile');
    });
  });
});
