import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/row', 'Integration | Component | ui table/row');
test('it renders', function(assert) {
  this.render(hbs `{{partial ui-table/row}}`);
  assert.ok(this.$().html().trim().includes(''));
});
