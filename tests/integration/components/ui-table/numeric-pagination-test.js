import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/numeric-pagination', 'Integration | Component | ui table/numeric pagination');

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-table/numeric-pagination}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-table/numeric-pagination}}
      template block text
    {{/ui-table/numeric-pagination}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
