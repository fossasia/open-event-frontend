import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | admin statistics event', function(hooks) {
  setupTest(hooks);


  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:admin-statistics-event');
    assert.ok(adapter);
  });
});
