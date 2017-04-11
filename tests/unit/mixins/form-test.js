import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';
import { module, test } from 'qunit';

module('Unit | Mixin | form');

// Replace this with your real tests.
test('it works', function(assert) {
  let FormObject = Ember.Object.extend(FormMixin);
  let subject = FormObject.create();
  assert.ok(subject);
});
