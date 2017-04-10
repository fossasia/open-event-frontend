import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/places-autocomplete', 'Integration | Component | widgets/forms/places autocomplete', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{widgets/forms/places-autocomplete}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#widgets/forms/places-autocomplete}}
      template block text
    {{/widgets/forms/places-autocomplete}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
