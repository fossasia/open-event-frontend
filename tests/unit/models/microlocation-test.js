import { moduleForModel, test } from 'ember-qunit';

moduleForModel('microlocation', 'Unit | Model | microlocation', {
  // Specify the other units that are required for this test.
  needs: ['model:event', 'model:session']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
