import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | account/email preferences section', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{account/email-preferences-section}}`);
    assert.ok(this.element.innerHTML.trim().includes('Email'));
  });
});
