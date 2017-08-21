import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/cfs-proposal-modal', 'Integration | Component | modals/cfs proposal modal');

test('it renders', function(assert) {
  this.set('isOpen', false);
  this.render(hbs`{{modals/cfs-proposal-modal isOpen=isOpen}}`);
  assert.ok(this.$().html().trim().includes(''));
});
