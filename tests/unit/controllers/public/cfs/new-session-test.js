import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | public/cfs/new session', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:public/cfs/new-session');
    assert.ok(controller);
  });
});
