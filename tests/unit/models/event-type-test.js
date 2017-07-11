import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event-type', 'Unit | Model | event type', {
  needs: ['model:event']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
