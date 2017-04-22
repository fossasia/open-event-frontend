import { moduleForModel, test } from 'ember-qunit';

moduleForModel('sponsor', 'Unit | Model | sponsor', {
  needs: ['model:event']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
