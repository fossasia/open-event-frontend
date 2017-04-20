import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:create', 'Unit | Controller | create', {
  needs: ['service:store']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  const done = assert.async();
  let controller = this.subject();
  assert.ok(controller);
  done();
});
