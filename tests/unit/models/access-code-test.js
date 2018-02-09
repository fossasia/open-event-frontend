import { moduleForModel, test } from 'ember-qunit';

moduleForModel('access-code', 'Unit | Model | access code', {
  needs: ['model:event']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
