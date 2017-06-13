import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/change-image-modal', 'Integration | Component | modals/change image modal');

test('it renders', function(assert) {
  this.set('isOpen', false);
  this.render(hbs`{{modals/change-image-modal isOpen=isOpen}}`);
  assert.ok(this.$().html().trim().includes('Update'));
});