import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/admin/content/pages-form', 'Integration | Component | forms/admin/content/pages form');

test('it renders', function(assert) {
  this.render(hbs`{{forms/admin/content/pages-form}}`);
  assert.ok(this.$().html().trim().includes('Name'));
});
