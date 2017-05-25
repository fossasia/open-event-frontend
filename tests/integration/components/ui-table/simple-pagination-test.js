import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/simple-pagination', 'Integration | Component | ui table/simple pagination', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-table/simple-pagination}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-table/simple-pagination}}
      template block text
    {{/ui-table/simple-pagination}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
