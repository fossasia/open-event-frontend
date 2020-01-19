import Object from '@ember/object';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { module, test } from 'qunit';

module('Unit | Mixin | event wizard', function() {
  test('it works', function(assert) {
    let EventWizardObject = Object.extend(EventWizardMixin);
    let subject = EventWizardObject.create();
    assert.ok(subject);
  });
});
