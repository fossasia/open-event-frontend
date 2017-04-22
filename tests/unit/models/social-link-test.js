import { moduleForModel, test } from 'ember-qunit';

moduleForModel('social-link', 'Unit | Model | social link', {
  needs: ['model:event']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
