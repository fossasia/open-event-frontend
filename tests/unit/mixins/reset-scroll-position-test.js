import Ember from 'ember';
import ResetScrollPositionMixin from 'open-event-frontend/mixins/reset-scroll-position';
import { module, test } from 'qunit';

const { Object } = Ember;

module('Unit | Mixin | reset scroll position');

test('it works', function(assert) {
  let ResetScrollPositionObject = Object.extend(ResetScrollPositionMixin);
  let subject = ResetScrollPositionObject.create();
  assert.ok(subject);
});
