import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/global-filter', 'Integration | Component | ui table/global filter');

const messages = { searchPlaceholder: 'Search' };
test('it renders', function(assert) {
  this.set('messages', messages);
  this.render(hbs `{{ui-table/global-filter messages=messages}}`);
  assert.ok(this.$().html().trim().includes('Search'));
});
