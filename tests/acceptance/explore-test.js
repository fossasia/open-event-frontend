import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { currentSession } from 'ember-simple-auth/test-support';
import { login } from 'open-event-frontend/tests/helpers/custom-helpers';

module('Acceptance | explore', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /explore unauthenticated', async function(assert) {
    assert.ok(currentSession().session.isAuthenticated !== true);
    await visit('/explore');
    assert.equal(currentURL(), '/explore');
  });

  test('visiting /explore authenticated', async function(assert) {
    await login(assert);
    assert.equal(currentURL(), '/');
    assert.ok(currentSession().session.isAuthenticated);
    await visit('/explore');
    assert.equal(currentURL(), '/explore');
  });

  test('side bar loading test', async function(assert) {
    await visit('/explore');
    assert.equal(currentURL(), '/explore');
    assert.ok(this.element.innerHTML.trim().includes('Categories'));
    assert.ok(this.element.innerHTML.trim().includes('Event Type'));
    assert.ok(this.element.innerHTML.trim().includes('Date'));
    assert.ok(this.element.innerHTML.trim().includes('Clear Filters'));
  });

});
