import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/page-size', 'Integration | Component | ui table/page size');

test('it renders', function(assert) {
  this.render(hbs `{{ui-table/page-size}}`);
  assert.ok(this.$().html().trim().includes('10'));
});
