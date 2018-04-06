import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | create', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:create');
    assert.ok(controller);
  });
});
