import { moduleForModel, test } from 'ember-qunit';

moduleForModel('call-for-speakers', 'Unit | Model | call for speakers', {
  needs: ['model:event']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
