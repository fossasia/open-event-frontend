import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | events/view/sessions/create', function(hooks) {
  setupTest(hooks);


  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:events/view/sessions/create');
    assert.ok(controller);
  });
});
