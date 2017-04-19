import { test } from 'ember-qunit';
import moduleForComponent from '../../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/time-picker', 'Integration | Component | widgets/forms/time picker');

test('it renders', function(assert) {
  this.render(hbs`{{widgets/forms/time-picker}}`);
  assert.ok(this.$().html().trim().includes('calendar'));
});
