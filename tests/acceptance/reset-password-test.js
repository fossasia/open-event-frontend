import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | reset password');

test('visiting /reset-password', function(assert) {
  visit('/reset-password');

  andThen(function() {
    assert.equal(currentURL(), '/reset-password');
  });
});

test('visiting /reset-password after login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/reset-password');
    andThen(function() {
      assert.equal(currentURL(), '/');
    });
  });
});
