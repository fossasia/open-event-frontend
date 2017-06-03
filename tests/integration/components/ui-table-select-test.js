import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table-select', 'Integration | Component | ui table select');

test('it renders', function(assert) {
  this.render(hbs `{{ui-table-select}}`);
  assert.ok(this.$().html().trim().includes('10'));
});
