import EmberObject from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | ember-table-controller', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    const EmberTableControllerObject = EmberObject.extend(EmberTableControllerMixin);
    const subject = EmberTableControllerObject.create();
    assert.ok(subject);
  });
});
