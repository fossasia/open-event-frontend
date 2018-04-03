import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/add-system-role-modal', 'Integration | Component | modals/add system role modal');

test('it renders', function(assert) {
  this.set('isOpen', false);
  this.render(hbs`{{modals/add-system-role-modal isOpen=isOpen}}`);
  assert.ok(this.$().html().trim().includes('Add New System Role'));
});
