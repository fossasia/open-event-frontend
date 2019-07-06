import EmberObject from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | ember-table-controller', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let EmberTableControllerObject = EmberObject.extend(EmberTableControllerMixin);
    let subject = EmberTableControllerObject.create();
    assert.ok(subject);
  });
});
