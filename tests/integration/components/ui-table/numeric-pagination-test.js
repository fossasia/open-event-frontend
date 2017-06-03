import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/numeric-pagination', 'Integration | Component | ui table/numeric pagination');

test('it renders', function(assert) {
  this.render(hbs `{{ui-table/numeric-pagination}}`);
  assert.ok(this.$().html().trim().includes('pagination'));
});
