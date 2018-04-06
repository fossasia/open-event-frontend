import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | public/sessions/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:public/sessions/index');
    assert.ok(route);
  });
});
