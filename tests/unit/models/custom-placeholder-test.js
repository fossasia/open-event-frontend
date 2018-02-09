import { moduleForModel, test } from 'ember-qunit';

moduleForModel('custom-placeholder', 'Unit | Model | custom placeholder', {
  needs: ['model:event-sub-topic']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
