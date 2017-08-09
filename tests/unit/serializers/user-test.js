import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Serializer | user', {
  needs: [
    'serializer:user',
    'serializer:event',
    'model:event',
    'model:email-notification',
    'model:event-invoice',
    'transform:moment',
    'service:auth-manager'
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
