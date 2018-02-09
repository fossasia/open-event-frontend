import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event-topic', 'Unit | Serializer | event topic', {
  needs: [
    'serializer:event-topic',
    'serializer:event',
    'model:event',
    'model:event-sub-topic',
    'transform:moment'
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
