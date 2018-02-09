import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/all-columns-hidden', 'Integration | Component | ui table/all columns hidden');

test('it renders', function(assert) {
  this.render(hbs `{{ui-table/all-columns-hidden}}`);
  assert.ok(this.$().html().trim().includes('tr'));
});
