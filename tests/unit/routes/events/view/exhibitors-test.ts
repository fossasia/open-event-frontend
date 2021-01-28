import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | events/view/exhibitors', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:events/view/exhibitors');
    assert.ok(route);
  });
});
