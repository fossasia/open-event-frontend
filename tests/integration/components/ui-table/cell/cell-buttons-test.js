import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/cell-buttons', 'Integration | Component | ui table/cell/cell buttons');

test('it renders', function(assert) {
  this.set('editEvent', () => {});
  this.set('moveToDetails', () => {});
  this.set('openDeleteEventModal', () => {});
  this.render(hbs`{{ui-table/cell/cell-buttons editEvent=(action editEvent) moveToDetails=(action moveToDetails) openDeleteEventModal=(action openDeleteEventModal)}}`);
  assert.ok(this.$().text().trim().includes(''));
});
