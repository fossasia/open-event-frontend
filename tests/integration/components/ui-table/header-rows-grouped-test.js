import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/header-rows-grouped', 'Integration | Component | ui table/header rows grouped', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-table/header-rows-grouped}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-table/header-rows-grouped}}
      template block text
    {{/ui-table/header-rows-grouped}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
