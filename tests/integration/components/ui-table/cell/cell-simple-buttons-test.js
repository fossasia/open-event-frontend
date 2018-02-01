import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/cell-simple-buttons', 'Integration | Component | ui table/cell/cell simple buttons');

test('it renders', function(assert) {
  this.set('deleteSession', () => {});
  this.set('editSession', () => {});
  this.render(hbs`{{ui-table/cell/cell-simple-buttons deleteSession=(action deleteSession) editSession=(action editSession)}}`);
  assert.ok(this.$().html().trim().includes(''));
});
