import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event', 'Unit | Serializer | event', {
  needs: [
    'serializer:event',
    'serializer:user',
    'serializer:event-topic',
    'model:event-type',
    'model:event-topic',
    'model:event-sub-topic',
    'model:session',
    'model:sponsor',
    'model:microlocation',
    'model:track',
    'model:ticket',
    'model:social-link',
    'model:attendee',
    'model:speaker',
    'model:speakers-call',
    'model:email-notification',
    'model:custom-form',
    'model:tax',
    'model:event-copyright',
    'model:session-type',
    'model:user',
    'model:order-statistics-event',
    'model:event-statistics-general',
    'model:event-invoice',
    'model:discount-code',
    'model:access-code',
    'model:role-invite',
    'model:order',
    'transform:moment'
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
