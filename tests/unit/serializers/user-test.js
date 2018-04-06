import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Serializer | user', function(hooks) {
  setupTest(hooks);

  test('it serializes records', function(assert) {
    let record = run(() => this.owner.lookup('service:store').createRecord('user'));

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
