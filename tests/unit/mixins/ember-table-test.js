import EmberObject from '@ember/object';
import EmberTableMixin from 'open-event-frontend/mixins/ember-table';
import { module, test } from 'qunit';

module('Unit | Mixin | ember-table', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let EmberTableObject = EmberObject.extend(EmberTableMixin);
    let subject = EmberTableObject.create();
    assert.ok(subject);
  });
});
