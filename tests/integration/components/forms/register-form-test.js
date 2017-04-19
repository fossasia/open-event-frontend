import { test } from 'ember-qunit';
import moduleForComponent from '../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/register-form', 'Integration | Component | forms/register form');

test('it renders', function(assert) {
  this.render(hbs`{{forms/register-form}}`);
  assert.ok(this.$().html().trim().includes('Register'));
});
