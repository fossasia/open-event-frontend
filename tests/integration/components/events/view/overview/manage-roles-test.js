import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/overview/manage-roles', 'Integration | Component | events/overview/manage roles');

test('it renders', function(assert) {
  this.render(hbs`{{events/view/overview/manage-roles}}`);
  assert.ok(this.$().html().trim().includes('Manage roles'));
});
