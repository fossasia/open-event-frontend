import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | public/speaker/view', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:public/speaker/view');
    assert.ok(route);
  });
});
