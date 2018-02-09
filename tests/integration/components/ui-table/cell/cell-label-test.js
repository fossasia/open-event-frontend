import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/cell-label', 'Integration | Component | ui table/cell/cell label');

test('it renders', function(assert) {
  this.render(hbs`{{ui-table/cell/cell-label}}`);
  assert.ok(this.$().html().trim().includes(''));
});
