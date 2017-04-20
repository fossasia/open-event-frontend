import { moduleForModel, test } from 'ember-qunit';

moduleForModel('session', 'Unit | Model | session', {
  // Specify the other units that are required for this test.
  needs: ['model:session-type', 'model:microlocation', 'model:event', 'model:track']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
