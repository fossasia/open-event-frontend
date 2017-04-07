import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('errors/not-found', 'Integration | Component | errors/not found', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{errors/not-found}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#errors/not-found}}
      template block text
    {{/errors/not-found}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
