import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell tickets', function(hooks) {
  setupIntegrationTest(hooks);

  const record = [{ type: 'Premium', order: 12, total: 100 }];
  test('it renders', async function(assert) {
    this.set('record', record);
    await render(hbs `{{ui-table/cell/cell-tickets record=record}}`);
    assert.ok(this.element.innerHTML.trim().includes('Premium'));
  });

  test('it renders', async function(assert) {
    await render(hbs `{{ui-table/cell/cell-tickets record=record}}`);
    assert.ok(this.element.innerHTML.trim().includes('No Ticket Information'));
  });
});
