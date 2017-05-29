import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/no-data', 'Integration | Component | ui table/no data');

test('it renders', function(assert) {
  this.render(hbs`
    {{#ui-table/no-data}}
      template block text
    {{/ui-table/no-data}}
  `);
  assert.ok(this.$().text().trim().includes('template block text'));
});
