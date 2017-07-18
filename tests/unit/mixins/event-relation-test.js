import Ember from 'ember';
import EventRelationMixin from 'open-event-frontend/mixins/event-relation';
import { module, test } from 'qunit';

const { Object: EmberObject } = Ember;

module('Unit | Mixin | event relation');

test('it works', function(assert) {
  let EventRelationObject = EmberObject.extend(EventRelationMixin);
  let subject = EventRelationObject.create();
  assert.ok(subject);
});
