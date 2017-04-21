import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-bar', 'Integration | Component | nav bar');

test('it renders', function(assert) {
  this.render(hbs`{{nav-bar}}`);
  assert.ok(this.$().html().trim().includes('Browse Events'));
});
