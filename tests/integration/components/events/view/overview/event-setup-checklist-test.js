import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/overview/event-setup-checklist', 'Integration | Component | events/overview/event setup checklist');

test('it renders', function(assert) {
  this.render(hbs`{{events/view/overview/event-setup-checklist}}`);
  assert.ok(this.$().html().trim().includes('Event setup checklist'));
});
