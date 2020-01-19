import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | my sessions/list', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:my-sessions/list');
    assert.ok(route);
  });
});
