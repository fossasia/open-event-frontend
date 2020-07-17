import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | widgets/steps indicator', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('steps', []);
    await render(hbs`{{widgets/steps-indicator steps=steps currentStep=1 enableAll=false}}`);
    assert.ok(this.element.innerHTML.trim().includes('steps'));
  });
});
