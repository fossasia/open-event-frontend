import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | admin/settings/index', function(hooks) {
  setupTest(hooks);


  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:admin/settings/index');
    assert.ok(controller);
  });
});
