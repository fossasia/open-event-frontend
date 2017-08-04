import { moduleForModel, test } from 'ember-qunit';

moduleForModel('email-notification', 'Unit | Model | email notification', {
  needs: ['model:event', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
