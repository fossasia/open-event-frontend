import { moduleForModel, test } from 'ember-qunit';

moduleForModel('ticket', 'Unit | Serializer | ticket', {
  needs: [
    'serializer:ticket',
    'model:order-statistics-ticket',
    'model:event',
    'model:user',
    'model:order',
    'model:attendee',
    'transform:moment'
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
