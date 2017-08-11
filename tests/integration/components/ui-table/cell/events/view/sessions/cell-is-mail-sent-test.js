import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/events/views/sessions/cell-is-mail-sent', 'Integration | Component | ui table/cell/events/views/sessions/cell is mail sent');

test('it renders', function(assert) {

  this.render(hbs`{{ui-table/cell/events/views/sessions/cell-is-mail-sent}}`);
  assert.ok(this.$().html().trim().includes(''));

});
