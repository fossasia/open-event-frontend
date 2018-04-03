import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | my-sessions');

test('visiting /my-sessions without login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/my-sessions');
    andThen(function() {
      assert.equal(currentURL(), '/login');
    });
  });
});

test('visiting /my-sessions/upcoming without login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/my-sessions/upcoming');
    andThen(function() {
      assert.equal(currentURL(), '/login');
    });
  });
});

test('visiting /my-sessions/past without login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/my-sessions/past');
    andThen(function() {
      assert.equal(currentURL(), '/login');
    });
  });
});

test('visiting /my-sessions with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/my-sessions');
    andThen(function() {
      assert.equal(currentURL(), '/my-sessions/upcoming');
    });
  });
});

test('visiting /my-sessions/upcoming with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/my-sessions/upcoming');
    andThen(function() {
      assert.equal(currentURL(), '/my-sessions/upcoming');
    });
  });
});

test('visiting /my-sessions/past with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/my-sessions/past');
    andThen(function() {
      assert.equal(currentURL(), '/my-sessions/past');
    });
  });
});
