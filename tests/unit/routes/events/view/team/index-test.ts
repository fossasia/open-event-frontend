import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | events/view/team/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:events/view/team/index');
    assert.ok(route);
  });
});
