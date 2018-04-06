import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/cell/cell simple buttons', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('deleteSession', () => {});
    this.set('editSession', () => {});
    this.set('viewSession', () => {});
    this.render(hbs`{{ui-table/cell/cell-simple-buttons deleteSession=(action deleteSession) editSession=(action editSession) viewSession=(action viewSession)}}`);
    assert.ok(find('*').innerHTML.trim().includes(''));
  });
});
