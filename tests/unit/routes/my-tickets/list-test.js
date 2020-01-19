import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | my tickets/list', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:my-tickets/list');
    assert.ok(route);
  });
});
