import { moduleForModel, test } from 'ember-qunit';

moduleForModel('track', 'Unit | Model | track', {
  needs: ['model:session', 'model:event']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
