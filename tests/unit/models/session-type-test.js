import { moduleForModel, test } from 'ember-qunit';

moduleForModel('session-type', 'Unit | Model | session type', {
  needs: ['model:event', 'model:session']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
