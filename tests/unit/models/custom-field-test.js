import { moduleForModel, test } from 'ember-qunit';

moduleForModel('custom-field', 'Unit | Model | custom field', {
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
