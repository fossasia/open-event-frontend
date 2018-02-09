import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event', 'Unit | Serializer | application', {
  needs: [
    'serializer:application',
    'model:event',
    'model:event-type',
    'model:event-topic',
    'model:event-sub-topic',
    'model:session',
    'model:sponsor',
    'model:microlocation',
    'model:event-invoice',
    'model:notification',
    'model:track',
    'model:ticket',
    'model:social-link',
    'model:speaker',
    'model:speakers-call',
    'model:email-notification',
    'model:admin-statistics-event',
    'model:admin-statistics-user',
    'model:admin-statistics-mail',
    'model:admin-statistics-session',
    'model:event-statistics-general',
    'model:order-statistics-event',
    'model:attendee',
    'model:custom-placeholder',
    'model:tax',
    'model:custom-form',
    'model:event-copyright',
    'model:session-type',
    'model:user',
    'model:discount-code',
    'model:access-code',
    'model:order',
    'model:role-invite',
    'transform:moment'
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
