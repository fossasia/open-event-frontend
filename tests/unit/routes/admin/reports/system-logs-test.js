import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';


module('Unit | Route | admin/reports/system logs', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:admin/reports/system-logs');
    assert.ok(route);
  });
});
