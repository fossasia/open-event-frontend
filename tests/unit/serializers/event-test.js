import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event', 'Unit | Serializer | event', {
  needs: ['serializer:event', 'model:user']
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
