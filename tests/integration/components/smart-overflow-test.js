import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('smart-overflow', 'Integration | Component | smart overflow');

test('it renders', function(assert) {
  this.render(hbs`{{smart-overflow}}`);
  assert.ok(this.$().html().trim().includes('smart-overflow'));
});
