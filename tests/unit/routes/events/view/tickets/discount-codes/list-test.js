import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | events/view/tickets/discount codes/list', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:events/view/tickets/discount-codes/list');
    assert.ok(route);
  });
});
