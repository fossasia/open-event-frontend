import { moduleFor, test } from 'ember-qunit';

moduleFor('service:auth-manager', 'Unit | Service | auth manager', {
  needs: ['service:session', 'service:metrics']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
