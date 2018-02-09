import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/header-sorting-icons', 'Integration | Component | ui table/header sorting icons');

const column = { sortAsc: true };
test('it renders', function(assert) {
  this.set('column', column);
  this.render(hbs `{{ui-table/header-sorting-icons column=column}}`);
  assert.ok(this.$().html().trim().includes('caret'));
});
