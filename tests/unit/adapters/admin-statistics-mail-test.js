import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | admin statistics mail', function(hooks) {
  setupTest(hooks);


  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:admin-statistics-mail');
    assert.ok(adapter);
  });
});
