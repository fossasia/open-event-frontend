import { moduleForModel, test } from 'ember-qunit';

moduleForModel('event-copyright', 'Unit | Model | event copyright', {
  needs: ['model:event']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
