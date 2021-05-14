import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Model | video stream moderator', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    const store = this.owner.lookup('service:store');
    const model = run(() => store.createRecord('video-stream-moderator', {}));
    assert.ok(model);
  });
});
