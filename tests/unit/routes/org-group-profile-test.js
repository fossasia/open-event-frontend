import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | org-group-profile', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:org-group-profile');
    assert.ok(route);
  });
});
