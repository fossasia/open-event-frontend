import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | reset password', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:reset-password');
    assert.ok(controller);
  });
});
