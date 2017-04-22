import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/radio-button', 'Integration | Component | widgets/forms/radio button', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{widgets/forms/radio-button}}`);
  assert.ok(this.$().html().trim().includes('radio'));
});
