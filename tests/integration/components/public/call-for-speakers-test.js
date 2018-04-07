import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | public/call for speakers', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{public/call-for-speakers}}`);
    assert.ok(this.element.innerHTML.trim().includes('Call for Speakers'));
  });
});
