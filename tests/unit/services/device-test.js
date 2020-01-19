import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | device', function(hooks) {
  setupTest(hooks);


  test('it exists', function(assert) {
    let service = this.owner.lookup('service:device');
    assert.ok(service);

    assert.ok(service.isInternetExplorer !== true);
  });
});
