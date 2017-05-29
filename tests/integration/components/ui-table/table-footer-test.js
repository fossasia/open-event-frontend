import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/table-footer', 'Integration | Component | ui table/table footer');

test('it renders', function(assert) {
  this.render(hbs`{{ui-table/table-footer}}`);
  assert.ok(this.$().html().trim().includes('10'));
});
