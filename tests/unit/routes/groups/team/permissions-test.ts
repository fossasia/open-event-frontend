import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | groups/team/permissions', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:groups/team/permissions');
    assert.ok(route);
  });
});
