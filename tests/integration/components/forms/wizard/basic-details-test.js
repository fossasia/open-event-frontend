import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/wizard/basic-details', 'Integration | Component | forms/wizard/basic details', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{forms/wizard/basic-details}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#forms/wizard/basic-details}}
      template block text
    {{/forms/wizard/basic-details}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
