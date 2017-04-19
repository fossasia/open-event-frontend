import Ember from 'ember';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { module, test } from 'qunit';

const { Object } = Ember;

module('Unit | Mixin | event wizard');

// Replace this with your real tests.
test('it works', function(assert) {
  let EventWizardObject = Object.extend(EventWizardMixin);
  let subject = EventWizardObject.create();
  assert.ok(subject);
});
