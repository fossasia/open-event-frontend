import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/all-columns-hidden', 'Integration | Component | ui table/all columns hidden');

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-table/all-columns-hidden}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-table/all-columns-hidden}}
      template block text
    {{/ui-table/all-columns-hidden}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
