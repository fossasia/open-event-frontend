import Ember from 'ember';
import CustomFormMixin from 'open-event-frontend/mixins/custom-form';
import { module, test } from 'qunit';

const { Object } = Ember;

module('Unit | Mixin | custom form');

test('it works', function(assert) {
  let CustomFormObject = Object.extend(CustomFormMixin);
  let subject = CustomFormObject.create();
  assert.ok(subject);
});
