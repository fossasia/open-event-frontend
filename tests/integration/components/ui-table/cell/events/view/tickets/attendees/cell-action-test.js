import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/events/view/tickets/attendees/cell-action', 'Integration | Component | ui table/cell/events/view/tickets/attendees/cell action');

test('it renders', function(assert) {
  this.render(hbs`{{ui-table/cell/events/view/tickets/attendees/cell-action}}`);
  assert.ok(this.$().text().trim().includes(''));
});
