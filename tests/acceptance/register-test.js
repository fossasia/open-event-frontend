import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | register');

test('visiting /register', function(assert) {
  visit('/register');

  andThen(function() {
    assert.equal(currentURL(), '/register');
  });
});

test('visiting /register and registering with existing user', function(assert) {
  visit('/register');
  andThen(function() {
    assert.equal(currentURL(), '/register');
    fillIn('input[name=email]', 'opev_test_user@nada.email');
    fillIn('input[name=password]', 'opev_test_user');
    fillIn('input[name=password_repeat]', 'opev_test_user');
    click('button[type=submit]');
    andThen(function() {
      assert.equal(currentURL(), '/register');
      const errorMessageDiv = findWithAssert('.ui.negative.message');
      assert.equal(errorMessageDiv[0].textContent.trim(), 'An unexpected error occurred.');
    });
  });
});

test('visiting /register after login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/register');
    andThen(function() {
      assert.equal(currentURL(), '/');
    });
  });
});
