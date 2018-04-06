import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/cell/admin/reports/system logs/mail logs/cell mail message', function(hooks) {
  setupRenderingTest(hooks);

  const record = { message: 'Hello', subject: 'New User' };

  test('it renders', function(assert) {
    this.set('record', record);
    this.render(hbs `{{ui-table/cell/admin/reports/system-logs/mail-logs/cell-mail-message record=record}}`);
    assert.ok(find('*').innerHTML.trim().includes('Hello'));
  });
});
