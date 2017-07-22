import { moduleForModel, test } from 'ember-qunit';

moduleForModel('speaker', 'Unit | Model | speaker', {
  needs: ['model:event',  'model:user', 'model:session']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
