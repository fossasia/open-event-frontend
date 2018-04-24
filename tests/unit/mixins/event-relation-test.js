import EmberObject from '@ember/object';
import EventRelationMixin from 'open-event-frontend/mixins/event-relation';
import { module, test } from 'qunit';

module('Unit | Mixin | event relation', function() {
  test('it works', function(assert) {
    let EventRelationObject = EmberObject.extend(EventRelationMixin);
    let subject = EventRelationObject.create();
    assert.ok(subject);
  });
});
