import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | events');

test('visiting /events/live without login', function(assert) {
  visit('/events/live');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /events/draft without login', function(assert) {
  visit('/events/draft');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /events/past without login', function(assert) {
  visit('/events/past');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /events/import without login', function(assert) {
  visit('/events/import');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /events/live with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/events/live');
    andThen(function() {
      assert.equal(currentURL(), '/events/live');
    });
  });
});

test('visiting /events/draft with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/events/draft');
    andThen(function() {
      assert.equal(currentURL(), '/events/draft');
    });
  });
});

test('visiting /events/past with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/events/past');
    andThen(function() {
      assert.equal(currentURL(), '/events/past');
    });
  });
});

test('visiting /events/past with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/events/past');
    andThen(function() {
      assert.equal(currentURL(), '/events/past');
    });
  });
});
