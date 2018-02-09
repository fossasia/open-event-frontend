import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event-sub-topic', 'Unit | Serializer | event sub topic', {
  needs: [
    'serializer:event-sub-topic',
    'serializer:event',
    'model:event-topic',
    'model:event',
    'model:custom-placeholder'
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
