import EmberObject from '@ember/object';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';
import { module, test } from 'qunit';

module('Unit | Mixin | ember-table-route', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    const EmberTableRouteObject = EmberObject.extend(EmberTableRouteMixin);
    const subject = EmberTableRouteObject.create();
    assert.ok(subject);
  });
});
