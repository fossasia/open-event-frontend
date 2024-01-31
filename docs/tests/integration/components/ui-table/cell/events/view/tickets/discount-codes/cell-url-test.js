import { hbs } from 'ember-cli-htmlbars';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';

module('Integration | Component | ui table/cell/events/view/tickets/discount codes/cell url', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`{{ui-table/cell/events/view/tickets/discount-codes/cell-url}}`);
    assert.ok(this.element.textContent.trim().includes(''));

  });
});
