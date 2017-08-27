import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/cell-roles', 'Integration | Component | ui table/cell/cell roles');

const record = { roles: [{ type: 'Organiser', email: 'sample@sample.com' }] };

test('it renders', function(assert) {
  this.set('record', record);
  this.render(hbs `{{ui-table/cell/cell-roles record=record}}`);
  assert.ok(this.$().html().trim().includes(''));
});
