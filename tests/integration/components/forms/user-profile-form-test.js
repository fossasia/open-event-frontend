import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/user-profile-form', 'Integration | Component | forms/user profile form');

test('it renders', function(assert) {
  this.render(hbs`{{forms/user-profile-form l10n=l10n}}`);
  assert.ok(this.$().html().trim().includes('Name'));
});
