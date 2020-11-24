import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | public/stream/view', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:public/stream/view');
    assert.ok(route);
  });
});
