import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | settings');

test('visiting /settings/applications without login', function(assert) {
  visit('/settings/applications');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('visiting /settings/contact-info with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/settings/contact-info');
    andThen(function() {
      assert.equal(currentURL(), '/settings/contact-info');
    });
  });
});

test('visiting /settings/password with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/settings/password');
    andThen(function() {
      assert.equal(currentURL(), '/settings/password');
    });
  });
});

test('visiting /settings/email-preferences with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/settings/email-preferences');
    andThen(function() {
      assert.equal(currentURL(), '/settings/email-preferences');
    });
  });
});

test('visiting /settings/applications with login', function(assert) {
  login(assert);
  andThen(function() {
    visit('/settings/applications');
    andThen(function() {
      assert.equal(currentURL(), '/settings/applications');
    });
  });
});
