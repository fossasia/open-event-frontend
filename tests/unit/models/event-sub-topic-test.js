import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event-sub-topic', 'Unit | Model | event sub topic', {
  needs: ['model:event', 'model:event-topic']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
