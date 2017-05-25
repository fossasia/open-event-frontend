import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/expand-row-cell', 'Integration | Component | ui table/expand row cell', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-table/expand-row-cell}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-table/expand-row-cell}}
      template block text
    {{/ui-table/expand-row-cell}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
