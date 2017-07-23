import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Model | user', {
  needs: ['model:event', 'service:auth-manager']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
