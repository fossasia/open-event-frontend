import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell event', function(hooks) {
  setupIntegrationTest(hooks);

  const record = { name: 'Event', image: 'url' };
  test('it renders', async function(assert) {
    this.set('record', record);
    await render(hbs `{{ui-table/cell/cell-event record=record}}`);
    assert.ok(this.element.innerHTML.trim().includes('Event'));
  });
});
