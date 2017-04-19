import { test } from 'ember-qunit';
import moduleForComponent from '../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/modal-base', 'Integration | Component | modals/modal base');

test('it renders', function(assert) {
  this.set('isOpen', true);
  this.render(hbs`{{modals/modal-base isOpen=isOpen}}`);
  assert.ok(this.$().html().trim().includes('modal'));
});
