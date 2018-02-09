import { moduleForModel, test } from 'ember-qunit';

moduleForModel('discount-code', 'Unit | Model | discount code', {
  needs: ['model:ticket', 'model:event', 'model:order']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
