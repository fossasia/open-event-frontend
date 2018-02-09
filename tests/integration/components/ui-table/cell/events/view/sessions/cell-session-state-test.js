import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/events/views/sessions/cell-session-state', 'Integration | Component | ui table/cell/events/views/sessions/cell session state');

test('it renders', function(assert) {

  this.render(hbs`{{ui-table/cell/events/views/sessions/cell-session-state}}`);
  assert.ok(this.$().html().trim().includes(''));

});
