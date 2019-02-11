import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import { login, logout } from 'open-event-frontend/tests/helpers/custom-helpers';

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
    await render(hbs`{{explore/side-bar l10n=l10n}}`);
    assert.ok(this.element.innerHTML.trim().includes('Categories'));
    assert.ok(this.element.innerHTML.trim().includes('Event Type'));
    assert.ok(this.element.innerHTML.trim().includes('Date'));
  });

});
