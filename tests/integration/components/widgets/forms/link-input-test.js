import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/link-input', 'Integration | Component | widgets/forms/link input', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{widgets/forms/link-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#widgets/forms/link-input}}
      template block text
    {{/widgets/forms/link-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
