import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | notifications');

test('visiting /notifications without login', async function(assert) {
  visit('/notifications');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /notifications with login', async function(assert) {
  login(assert);
  andThen(function() {
    visit('/notifications');
    andThen(function() {
      assert.equal(currentURL(), '/notifications');
    });
  });
});
