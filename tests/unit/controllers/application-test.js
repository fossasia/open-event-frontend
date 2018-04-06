import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | application', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const done = assert.async();
    let controller = this.owner.lookup('controller:application');
    assert.ok(controller);
    done();
  });
});
