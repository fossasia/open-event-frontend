import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | admin/reports/system logs/mail logs', function(hooks) {
  setupTest(hooks);


  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:admin/reports/system-logs/mail-logs');
    assert.ok(controller);
  });
});
