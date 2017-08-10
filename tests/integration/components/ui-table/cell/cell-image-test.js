import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/cell-image', 'Integration | Component | ui table/cell/cell image');

test('it renders', function(assert) {
  this.render(hbs`{{ui-table/cell/cell-image}}`);
  assert.ok(this.$().html().trim().includes(''));
});
