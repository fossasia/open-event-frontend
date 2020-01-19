import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | my tickets/past', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:my-tickets/past');
    assert.ok(route);
  });
});
