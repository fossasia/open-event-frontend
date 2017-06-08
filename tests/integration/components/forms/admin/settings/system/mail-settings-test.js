import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/admin/settings/system/mail-settings', 'Integration | Component | forms/admin/settings/system/mail settings');

test('it renders', function(assert) {
  this.render(hbs`{{forms/admin/settings/system/mail-settings}}`);
  assert.ok(this.$().html().trim().includes('Mail Settings'));
});
