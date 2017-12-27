import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/cell-sponsor-options', 'Integration | Component | ui table/cell/cell sponsor options');

test('it renders', function(assert) {
  this.set('deleteSponsor', () => {});
  this.render(hbs`{{ui-table/cell/cell-sponsor-options deleteSponsor=(action deleteSponsor)}}`);
  assert.ok(this.$().text().trim().includes(''));
});
