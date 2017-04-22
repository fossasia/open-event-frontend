import { moduleForModel, test } from 'ember-qunit';

moduleForModel('stripe', 'Unit | Model | stripe', {
  needs: ['model:event']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
