import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('quick-filter', 'Integration | Component | quick-filter');

test('it renders', function(assert) {
  this.render(hbs`{{quick-filter}}`);
  assert.ok(this.$().html().trim().includes('Search'));
});
