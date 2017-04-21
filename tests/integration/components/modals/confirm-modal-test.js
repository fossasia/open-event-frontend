import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/confirm-modal', 'Integration | Component | modals/confirm modal');

test('it renders', function(assert) {
  this.set('isOpen', false);
  this.render(hbs`{{modals/confirm-modal isOpen=isOpen}}`);
  assert.ok(this.$().html().trim().includes('Are you sure ?'));
});
