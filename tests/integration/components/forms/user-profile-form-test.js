import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | forms/user profile form', function(hooks) {
  setupIntegrationTest(hooks);

  var user = EmberObject.create({
    firstName : 'Test',
    lastName  : 'User',
    details   : 'This is a test'
  });

  test('it renders', async function(assert) {
    this.set('user', user);
    await render(hbs`{{forms/user-profile-form user=user l10n=l10n}}`);
    assert.ok(this.element.innerHTML.trim().includes('Test'));
  });
});
