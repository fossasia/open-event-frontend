import { moduleForModel, test } from 'ember-qunit';

moduleForModel('speakers-call', 'Unit | Model | speakers call', {
  needs: ['model:event']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
