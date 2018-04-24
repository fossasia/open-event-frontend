import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | admin/sessions/list', function(hooks) {
  setupTest(hooks);
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:admin/sessions/list');
    assert.ok(controller);
  });
});
