import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/events/view/tickets/discount codes/cell actions', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('deleteDiscountCode', () => {});
    await render(hbs`{{ui-table/cell/events/view/tickets/discount-codes/cell-actions deleteDiscountCode=(action deleteDiscountCode)}}`);
    assert.ok(this.element.textContent.trim().includes(''));

  });
});
