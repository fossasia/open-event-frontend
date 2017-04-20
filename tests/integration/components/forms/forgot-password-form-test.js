import { test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moduleForComponent from '../../../helpers/component-helper';

moduleForComponent('forms/forgot-password-form', 'Integration | Component | forms/forgot password form');

test('it renders', function(assert) {
  this.render(hbs`{{forms/forgot-password-form i18n=i18n}}`);
  assert.ok(this.$().html().trim().includes('Forgot Password'));
});
