import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/events/view/tickets/discount codes/cell actions', function(hooks) {
  setupIntegrationTest(hooks);
  const props = {
    actions: {
      deleteDiscountCode : () => {},
      editDiscountCode   : () => {},
      toggleStatus       : () => {}
    }
  };
  test('it renders', async function(assert) {
    this.set('props', props);
    await render(hbs`{{ui-table/cell/events/view/tickets/discount-codes/cell-actions props=props}}`);
    assert.ok(this.element.textContent.trim().includes(''));

  });
});
