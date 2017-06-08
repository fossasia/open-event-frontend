import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/admin/settings/system/storage-option', 'Integration | Component | forms/admin/settings/system/storage option');

test('it renders', function(assert) {
  this.render(hbs`{{forms/admin/settings/system/storage-option}}`);
  assert.ok(this.$().html().trim().includes('Storage'));
});
