import { moduleForModel, test } from 'ember-qunit';
import fragmentTransformInitializer from 'open-event-frontend/initializers/model-fragments';
import Ember from 'ember';

const { getOwner, run } = Ember;

moduleForModel('event', 'Unit | Serializer | event', {
  needs: ['serializer:event'],
  beforeEach() {
    run(() => fragmentTransformInitializer.initialize(getOwner(this)));
  }
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
