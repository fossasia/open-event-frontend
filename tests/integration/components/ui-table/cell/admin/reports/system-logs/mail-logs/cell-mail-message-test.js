import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/admin/reports/system logs/mail logs/cell mail message', function(hooks) {
  setupIntegrationTest(hooks);

  const record = { message: 'Hello', subject: 'New User' };

  test('it renders', async function(assert) {
    this.set('record', record);
    await render(hbs `{{ui-table/cell/admin/reports/system-logs/mail-logs/cell-mail-message record=record}}`);
    assert.ok(this.element.innerHTML.trim().includes('Hello'));
  });
});
