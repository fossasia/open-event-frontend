import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/admin/settings/ticket-fees-form', 'Integration | Component | forms/admin/settings/ticket fees form');

test('it renders', function(assert) {
  this.render(hbs`{{forms/admin/settings/ticket-fees-form}}`);
  assert.ok(this.$().html().trim().includes('currencies'));
});
