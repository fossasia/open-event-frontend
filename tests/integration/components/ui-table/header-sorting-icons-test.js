import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/header sorting icons', function(hooks) {
  setupRenderingTest(hooks);

  const column = { sortAsc: true };
  test('it renders', function(assert) {
    this.set('column', column);
    this.render(hbs `{{ui-table/header-sorting-icons column=column}}`);
    assert.ok(find('*').innerHTML.trim().includes('caret'));
  });
});
