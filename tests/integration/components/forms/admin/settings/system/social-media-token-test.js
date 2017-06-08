import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/admin/settings/system/social-media-token', 'Integration | Component | forms/admin/settings/system/social media token');

test('it renders', function(assert) {
  this.render(hbs`{{forms/admin/settings/system/social-media-token}}`);
  assert.ok(this.$().html().trim().includes('Tokens'));
});
