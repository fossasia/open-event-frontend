import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/expand-row-cell', 'Integration | Component | ui table/expand row cell');

test('it renders', function(assert) {
  this.render(hbs `{{partial ui-table/expand-row-cell}}`);
  assert.ok(this.$().html().trim().includes(''));
});
