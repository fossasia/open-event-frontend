import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/cell-sessions', 'Integration | Component | ui table/cell/cell sessions');

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-table/cell/cell-sessions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-table/cell/cell-sessions}}
      template block text
    {{/ui-table/cell/cell-sessions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
