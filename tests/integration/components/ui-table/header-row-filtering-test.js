import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/header-row-filtering', 'Integration | Component | ui table/header row filtering', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-table/header-row-filtering}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-table/header-row-filtering}}
      template block text
    {{/ui-table/header-row-filtering}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
