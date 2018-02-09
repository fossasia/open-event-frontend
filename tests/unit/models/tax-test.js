import { moduleForModel, test } from 'ember-qunit';

moduleForModel('tax', 'Unit | Model | tax', {
  needs: ['model:event']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
