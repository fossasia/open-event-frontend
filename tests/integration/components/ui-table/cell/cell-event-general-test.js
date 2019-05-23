import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell event general', function(hooks) {
  setupIntegrationTest(hooks);

  const record = { name: 'Event', image: 'url' }
  test('it renders', async function(assert) {
    this.set('record', record);
    this.set('editEvent', () => {});
    this.set('moveToDetails', () => {});
    this.set('moveToPublic', () => {});
    await render(hbs`{{ui-table/cell/cell-event-general record=record editEvent=(action editEvent) moveToDetails=(action moveToDetails) moveToPublic=(action moveToPublic)}}`);
    assert.ok(this.element.textContent.trim().includes('Event'));
  });
});
