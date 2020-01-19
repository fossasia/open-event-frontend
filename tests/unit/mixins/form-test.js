import Object from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import { module, test } from 'qunit';

module('Unit | Mixin | form', function() {
  test('it works', function(assert) {
    let FormObject = Object.extend(FormMixin);
    let subject = FormObject.create();
    assert.ok(subject);
  });
});
