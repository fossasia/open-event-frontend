import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/forgot-password-form', 'Integration | Component | forms/forgot password form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{forms/forgot-password-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#forms/forgot-password-form}}
      template block text
    {{/forms/forgot-password-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
