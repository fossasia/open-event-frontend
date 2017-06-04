import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('settings/password-section', 'Integration | Component | settings/password section');

test('it renders', function(assert) {
  this.render(hbs`{{settings/password-section}}`);
  assert.ok(this.$().html().trim().includes('Current Password'));
});
