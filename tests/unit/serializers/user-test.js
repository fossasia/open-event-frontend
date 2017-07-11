import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Serializer | user', {
  needs: [
    'serializer:user',
    'serializer:event',
    'model:event'
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
