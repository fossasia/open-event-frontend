import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event-invoice', 'Unit | Model | event invoice', {
  needs: ['model:event', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
