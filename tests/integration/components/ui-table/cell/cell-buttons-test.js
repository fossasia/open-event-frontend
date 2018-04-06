import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/cell/cell buttons', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('editEvent', () => {});
    this.set('moveToDetails', () => {});
    this.set('openDeleteEventModal', () => {});
    this.render(hbs`{{ui-table/cell/cell-buttons editEvent=(action editEvent) moveToDetails=(action moveToDetails) openDeleteEventModal=(action openDeleteEventModal)}}`);
    assert.ok(find('*').textContent.trim().includes(''));
  });
});
