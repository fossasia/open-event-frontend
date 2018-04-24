import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | my sessions/view', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:my-sessions/view');
    assert.ok(route);
  });
});
