import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | register', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:register');
    assert.ok(controller);
  });
});
