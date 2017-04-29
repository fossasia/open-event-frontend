import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/color-picker', 'Integration | Component | widgets/forms/color picker', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{widgets/forms/color-picker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#widgets/forms/color-picker}}
      template block text
    {{/widgets/forms/color-picker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
