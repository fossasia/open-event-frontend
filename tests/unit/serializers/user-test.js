import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Serializer | user', {
  needs: [
    'serializer:user',
    'serializer:event',
    'model:event',
    'model:session',
    'model:email-notification',
    'model:event-invoice',
    'model:notification',
    'model:user',
    'model:session',
    'model:speaker',
    'model:order',
    'model:attendee',
    'transform:moment',
    'service:auth-manager'
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
