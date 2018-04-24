import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | admin/content/system images/list', function(hooks) {
  setupTest(hooks);


  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:admin/content/system-images/list');
    assert.ok(controller);
  });
});
