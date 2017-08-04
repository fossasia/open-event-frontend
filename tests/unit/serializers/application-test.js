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
    'model:track',
    'model:ticket',
    'model:social-link',
    'model:speaker',
    'model:speakers-call',
    'model:email-notification',
    'model:tax',
    'model:event-copyright',
    'model:session-type',
    'model:user',
    'model:discount-code',
    'transform:moment'
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
