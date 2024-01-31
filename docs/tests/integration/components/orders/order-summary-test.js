import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | orders/order summary', function(hooks) {
  setupIntegrationTest(hooks);

  const tickets =  A(
    [
      EmberObject.create({
        description   : 'Community ticket',
        price         : 2.50,
        name          : 'Community Ticket',
        type          : 'paid',
        id            : 1,
        quantity      : 10,
        orderQuantity : 0,
        minOrder      : 0,
        maxOrder      : 5
      }),
      EmberObject.create({
        description   : 'Standard ticket',
        price         : 3.05,
        name          : 'Standard Ticket',
        type          : 'paid',
        id            : 2,
        quantity      : 10,
        orderQuantity : 0,
        minOrder      : 0,
        maxOrder      : 5
      })
    ]
  );
  const data = EmberObject.create({
    tickets
  });

  test('it renders', async function(assert) {
    this.set('data', data);
    await render(hbs`{{orders/order-summary data=data}}`);
    assert.ok(this.element.textContent.trim(), 'order-summary');
  });
});
