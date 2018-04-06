import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | public/cfs/new speaker', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:public/cfs/new-speaker');
    assert.ok(route);
  });
});
