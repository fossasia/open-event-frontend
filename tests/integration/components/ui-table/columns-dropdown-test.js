import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/columns-dropdown', 'Integration | Component | ui table/columns dropdown');

const messages = { columnTitle: 'Columns' };
test('it renders', function(assert) {
  this.set('messages', messages);
  this.render(hbs `{{ui-table/columns-dropdown messages=messages}}`);
  assert.ok(this.$().html().trim().includes('Columns'));
});
