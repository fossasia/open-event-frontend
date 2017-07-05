import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event-topic', 'Unit | Serializer | event topic', {
  // Specify the other units that are required for this test.
  needs: ['serializer:event-topic', 'model:event-sub-topics']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
