import { moduleForModel, test } from 'ember-qunit';

moduleForModel('call-for-speakers', 'Unit | Model | call for speakers', {
  // Specify the other units that are required for this test.
  needs: ['model:event']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
