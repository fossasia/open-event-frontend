import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | my tickets/list', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:my-tickets/list');
    assert.ok(controller);
  });
});
