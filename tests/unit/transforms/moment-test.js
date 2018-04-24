import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | moment', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let transform = this.owner.lookup('transform:moment');
    assert.ok(transform);
  });
});
