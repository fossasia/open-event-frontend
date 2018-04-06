import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/cell/admin/reports/system logs/notification logs/cell time', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {

    this.render(hbs`{{ui-table/cell/admin/reports/system-logs/notification-logs/cell-time}}`);
    assert.ok(find('*').textContent.trim().includes(''));

  });
});
