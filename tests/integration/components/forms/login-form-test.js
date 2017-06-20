import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/login-form', 'Integration | Component | forms/login form');

test('it renders', function(assert) {
  this.render(hbs`{{forms/login-form l10n=l10n}}`);
  assert.ok(this.$().html().trim().includes('Login'));
});
