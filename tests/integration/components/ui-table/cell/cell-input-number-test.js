import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/cell-input-number', 'Integration | Component | ui table/cell/cell input number');

test('it renders', function(assert) {
  this.render(hbs`{{ui-table/cell/cell-input-number}}`);
  assert.ok(this.$().html().trim().includes(''));
});
