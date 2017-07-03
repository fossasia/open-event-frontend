import Ember from 'ember';
import CustomPrimaryKeyMixin from 'open-event-frontend/mixins/custom-primary-key';
import { module, test } from 'qunit';

const { Object } = Ember;

module('Unit | Mixin | custom primary key');

// Replace this with your real tests.
test('it works', function(assert) {
  let CustomPrimaryKeyObject = Object.extend(CustomPrimaryKeyMixin);
  let subject = CustomPrimaryKeyObject.create();
  assert.ok(subject);
});
