import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/page-size', 'Integration | Component | ui table/page size', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-table/page-size}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-table/page-size}}
      template block text
    {{/ui-table/page-size}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
