import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | create');

test('visiting /create without login', function(assert) {
  visit('/create');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /create with login redirect', function(assert) {
  visit('/create');
  andThen(function() {
    assert.equal(currentURL(), '/login');
    login(assert, null, null, false);
    andThen(function() {
      assert.equal(currentURL(), '/create');
    });
  });
});


test('visiting /create with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/create');
    andThen(function() {
      assert.equal(currentURL(), '/create');
    });
  });
});
