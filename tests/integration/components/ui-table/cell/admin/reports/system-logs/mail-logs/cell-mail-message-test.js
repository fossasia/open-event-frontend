import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/admin/reports/system logs/mail logs/cell mail message', function(hooks) {
  setupIntegrationTest(hooks);

  const record = 'Hello';
  const extraRecords = {
    subject: 'New User'
  };

  test('it renders', async function(assert) {
    this.setProperties({
      record,
      extraRecords }
    );
    await render(hbs `{{ui-table/cell/admin/reports/system-logs/mail-logs/cell-mail-message record=record extraRecords=extraRecords}}`);
    assert.ok(this.element.innerHTML.trim().includes('Hello'));
  });
});
