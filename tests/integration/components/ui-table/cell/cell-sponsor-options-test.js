import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/cell/cell sponsor options', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('deleteSponsor', () => {});
    this.set('editSponsor', () => {});
    this.render(hbs`{{ui-table/cell/cell-sponsor-options deleteSponsor=(action deleteSponsor) editSponsor=(action editSponsor)}}`);
    assert.ok(find('*').textContent.trim().includes(''));
  });
});
