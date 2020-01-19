import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | auth manager', function(hooks) {
  setupTest(hooks);


  test('it exists', function(assert) {
    let service = this.owner.lookup('service:auth-manager');
    assert.ok(service);
  });
});
