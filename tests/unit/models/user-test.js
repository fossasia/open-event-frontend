import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Model | user', {
  needs: ['model:event', 'model:speaker', 'model:email-notification', 'model:notification', 'model:event-invoice', 'model:attendee', 'model:order', 'service:auth-manager']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
