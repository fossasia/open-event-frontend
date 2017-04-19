import { test } from 'ember-qunit';
import moduleForComponent from '../../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/date-picker', 'Integration | Component | widgets/forms/date picker');

test('it renders', function(assert) {
  this.render(hbs`{{widgets/forms/date-picker}}`);
  assert.ok(this.$().html().trim().includes('calendar'));
});
