import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('order-summary', 'Integration | Component | order summary');

test('it renders', function(assert) {
  this.render(hbs`{{order-summary}}`);
  assert.ok(this.$().text().trim(), 'order-summary');
});
