import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/events/view/tickets/orders/cell actions', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('deleteOrder', () => {});
    this.set('cancelOrder', () => {});
    let record = EmberObject.create({
      amount : 20,
      status : 'cancelled'
    });
    this.set('record', record);
    await render(hbs`{{ui-table/cell/events/view/tickets/orders/cell-actions deleteOrder=(action deleteOrder) cancelOrder=(action cancelOrder) record=record}}`);
    assert.ok(this.element.textContent.trim().includes(''));

  });
});
