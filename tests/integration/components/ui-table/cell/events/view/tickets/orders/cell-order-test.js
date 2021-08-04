import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';
import EmberObject from '@ember/object';

module('Integration | Component | ui table/cell/events/view/tickets/orders/cell order', function(hooks) {
  setupIntegrationTest(hooks);

  const props = {
    actions: {
      cancelOrder        : () => {},
      resendConfirmation : () => {},
      completeOrder      : () => {}
    }
  };
  test('it renders', async function(assert) {
    const record = EmberObject.create({
      amount     : 20,
      status     : 'cancelled',
      identifier : 'identifier_order'
    });
    this.setProperties({
      record,
      props
    });
    await render(hbs`{{ui-table/cell/events/view/tickets/orders/cell-order props=props record=record}}`);
    assert.ok(this.element.textContent.trim().includes(''));
  });
});
