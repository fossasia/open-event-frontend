import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | events/view/edit/sponsors', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:events/view/edit/sponsors');
    assert.ok(controller);
  });
});
