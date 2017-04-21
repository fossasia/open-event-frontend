import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('errors/server-error', 'Integration | Component | errors/server error');

test('it renders', function(assert) {
  this.render(hbs`{{errors/server-error}}`);
  assert.ok(this.$().html().trim().includes('500'));
});
