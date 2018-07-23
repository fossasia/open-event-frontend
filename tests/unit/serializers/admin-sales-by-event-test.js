import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | admin sales by event', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('admin-sales-by-event');

    assert.ok(serializer);
  });

  test('it serializes records', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('admin-sales-by-event', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
