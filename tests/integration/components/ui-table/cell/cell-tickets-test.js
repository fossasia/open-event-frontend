import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/cell-tickets', 'Integration | Component | ui table/cell/cell tickets');

const record = { tickets: [{ type: 'Premium', order: 12, total: 100 }] };
test('it renders', function(assert) {
  this.set('record', record);
  this.render(hbs `{{ui-table/cell/cell-tickets record=record}}`);
  assert.ok(this.$().html().trim().includes('Premium'));
});
