import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | create session message', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('shouldShowMessage', true);
    await render(hbs`{{create-session-message shouldShowMessage=shouldShowMessage}}`);
    assert.dom(this.element).includesText('Your Speaker Details have been saved');
  });
});
