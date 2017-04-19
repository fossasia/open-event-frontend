import { test } from 'ember-qunit';
import moduleForComponent from '../../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/location-input', 'Integration | Component | widgets/forms/location input');

test('it renders', function(assert) {
  this.render(hbs`{{widgets/forms/location-input}}`);
  assert.ok(this.$().html().trim().includes('Enter address'));
});
