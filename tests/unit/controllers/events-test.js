import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | events', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:events');
    assert.ok(controller);
  });
});
