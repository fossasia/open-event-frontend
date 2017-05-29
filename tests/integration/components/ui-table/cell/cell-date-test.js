import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/cell-date', 'Integration | Component | ui table/cell/cell date');

test('it renders', function(assert) {
  this.render(hbs`{{ui-table/cell/cell-date}}`);

  assert.equal(this.$().text().trim(), '');

  this.render(hbs`
    {{#ui-table/cell/cell-date}}
      template block text
    {{/ui-table/cell/cell-date}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
