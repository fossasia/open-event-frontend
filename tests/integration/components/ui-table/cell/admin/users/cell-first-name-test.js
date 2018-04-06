import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/cell/admin/users/cell first name', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{ui-table/cell/admin/users/cell-first-name}}`);
    assert.ok(find('*').innerHTML.trim().includes(''));
  });
});
