import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/expand row cell', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs `{{partial ui-table/expand-row-cell}}`);
    assert.ok(find('*').innerHTML.trim().includes(''));
  });
});
