import Object from '@ember/object';
import CustomPrimaryKeyMixin from 'open-event-frontend/mixins/custom-primary-key';
import { module, test } from 'qunit';

module('Unit | Mixin | custom primary key');

// Replace this with your real tests.
test('it works', function(assert) {
  let CustomPrimaryKeyObject = Object.extend(CustomPrimaryKeyMixin);
  let subject = CustomPrimaryKeyObject.create();
  assert.ok(subject);
});
