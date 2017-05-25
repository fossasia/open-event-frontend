import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/columns-dropdown', 'Integration | Component | ui table/columns dropdown', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-table/columns-dropdown}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-table/columns-dropdown}}
      template block text
    {{/ui-table/columns-dropdown}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
