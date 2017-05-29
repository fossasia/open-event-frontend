import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/cell-buttons', 'Integration | Component | ui table/cell/cell buttons');

test('it renders', function(assert) {
  this.render(hbs`{{ui-table/cell/cell-buttons}}`);
  assert.ok(this.$().text().trim().includes('edit'));
});
