import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event-topic', 'Unit | Model | event topic', {
  needs: ['model:event-sub-topic', 'model:event']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
