import { moduleForModel, test } from 'ember-qunit';

moduleForModel('role-invite', 'Unit | Model | role invite', {
  // Specify the other units that are required for this test.
  needs: ['model:role', 'model:event']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
