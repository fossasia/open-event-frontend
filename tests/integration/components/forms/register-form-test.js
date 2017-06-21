import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/register-form', 'Integration | Component | forms/register form');

test('it renders', function(assert) {
  this.render(hbs`{{forms/register-form l10n=l10n}}`);
  assert.ok(this.$().html().trim().includes('Register'));
});
