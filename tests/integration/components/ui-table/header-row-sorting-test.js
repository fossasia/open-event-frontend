import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/header row sorting', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs `{{ui-table/header-row-sorting}}`);
    assert.ok(find('*').innerHTML.trim().includes('tr'));
  });
});
