import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | forgot password');

test('visiting /forgot-password', function(assert) {
  visit('/forgot-password');

  andThen(function() {
    assert.equal(currentURL(), '/forgot-password');
  });
});

test('visiting /forgot-password after login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/forgot-password');
    andThen(function() {
      assert.equal(currentURL(), '/');
    });
  });
});
