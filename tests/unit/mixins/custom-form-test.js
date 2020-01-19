import Object from '@ember/object';
import CustomFormMixin from 'open-event-frontend/mixins/custom-form';
import { module, test } from 'qunit';

module('Unit | Mixin | custom form', function() {
  test('it works', function(assert) {
    let CustomFormObject = Object.extend(CustomFormMixin);
    let subject = CustomFormObject.create();
    assert.ok(subject);
  });
});
