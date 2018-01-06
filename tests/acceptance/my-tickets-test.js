import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | my-tickets');

test('visiting /my-tickets without login', function(assert) {
  visit('/my-tickets');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /my-tickets/upcoming without login', function(assert) {
  visit('/my-tickets/upcoming');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /my-tickets/saved without login', function(assert) {
  visit('/my-tickets/saved');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /my-tickets/past without login', function(assert) {
  visit('/my-tickets/past');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /my-tickets with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/my-tickets');
    andThen(function() {
      assert.equal(currentURL(), '/my-tickets/upcoming');
    });
  });
});

test('visiting /my-tickets/upcoming with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/my-tickets/upcoming');
    andThen(function() {
      assert.equal(currentURL(), '/my-tickets/upcoming');
    });
  });
});

test('visiting /my-tickets/saved with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/my-tickets/saved');
    andThen(function() {
      assert.equal(currentURL(), '/my-tickets/saved');
    });
  });
});

test('visiting /my-tickets/past with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/my-tickets/past');
    andThen(function() {
      assert.equal(currentURL(), '/my-tickets/past');
    });
  });
});
