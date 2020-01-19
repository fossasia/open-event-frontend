import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | events/view/tickets/discount codes/list', function(hooks) {
  setupTest(hooks);


  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:events/view/tickets/discount-codes/list');
    assert.ok(controller);
  });
});
