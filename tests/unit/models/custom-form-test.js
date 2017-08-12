import { moduleForModel, test } from 'ember-qunit';

moduleForModel('custom-form', 'Unit | Model | custom form', {
  needs: [
    'model:event'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
