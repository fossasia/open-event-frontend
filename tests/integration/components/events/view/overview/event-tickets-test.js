import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/view/overview/event-tickets', 'Integration | Component | events/view/overview/event tickets');

test('it renders', function(assert) {
  this.render(hbs`{{events/view/overview/event-tickets}}`);
  assert.ok(this.$().html().trim().includes('Tickets'));
});
