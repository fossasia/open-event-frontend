import { moduleForModel, test } from 'ember-qunit';

moduleForModel('admin-statistics-session', 'Unit | Model | admin statistics session', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
