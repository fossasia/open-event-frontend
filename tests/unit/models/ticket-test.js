import { moduleForModel, test } from 'ember-qunit';

moduleForModel('ticket', 'Unit | Model | ticket', {
  needs: ['model:event', 'model:order']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
