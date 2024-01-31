import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';


module('Integration | Component | public/ticket list', function(hooks) {
  setupIntegrationTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

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
      }),
      EmberObject.create({
        description   : 'Super ticket',
        price         : 5.00,
        name          : 'Super Ticket',
        type          : 'paid',
        id            : 3,
        quantity      : 10,
        orderQuantity : 0,
        minOrder      : 0,
        maxOrder      : 5
      })
    ]
  );
  const eventTax = EmberObject.create({
    name                 : 'Sample Tax',
    rate                 : 20,
    isTaxIncludedInPrice : true
  });
  test('it renders', async function(assert) {
    this.set('data', tickets);
    this.set('taxInfo', eventTax);
    this.actions.placeOrder = function() { };
    await render(hbs `{{public/ticket-list data=data placeOrder=(action 'placeOrder') eventCurrency='USD' taxInfo=taxInfo}}`);
    assert.ok(this.element.innerHTML.trim().includes('Standard Ticket'));
  });
});
