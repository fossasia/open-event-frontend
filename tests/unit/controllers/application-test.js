import { test } from 'ember-qunit';
import moduleFor from 'open-event-frontend/tests/helpers/unit-helper';

moduleFor('controller:application', 'Unit | Controller | application', []);

test('it exists', function(assert) {
  const done = assert.async();
  let controller = this.subject();
  assert.ok(controller);
  done();
});
