import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/header-row-sorting', 'Integration | Component | ui table/header row sorting');

test('it renders', function(assert) {
  this.render(hbs `{{ui-table/header-row-sorting}}`);
  assert.ok(this.$().html().trim().includes('tr'));
});
