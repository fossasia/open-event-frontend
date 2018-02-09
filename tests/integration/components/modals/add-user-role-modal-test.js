import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/add-user-role-modal', 'Integration | Component | modals/add user role modal');

test('it renders', function(assert) {
  this.set('isOpen', false);
  this.render(hbs`{{modals/add-user-role-modal isOpen=isOpen}}`);
  assert.ok(this.$().html().trim().includes('Add Role'));
});
