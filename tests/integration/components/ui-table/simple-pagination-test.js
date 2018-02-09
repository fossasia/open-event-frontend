import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/simple-pagination', 'Integration | Component | ui table/simple pagination');

test('it renders', function(assert) {
  this.render(hbs `{{ui-table/simple-pagination}}`);
  assert.ok(this.$().html().trim().includes('toolbar'));
});
