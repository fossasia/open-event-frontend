import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | public/coc', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:public/coc');
    assert.ok(route);
  });
});
