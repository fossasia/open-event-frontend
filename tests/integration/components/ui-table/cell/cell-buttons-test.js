import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell buttons', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('editEvent', () => {});
    this.set('moveToDetails', () => {});
    this.set('openDeleteEventModal', () => {});
    await render(hbs`{{ui-table/cell/cell-buttons editEvent=(action editEvent) moveToDetails=(action moveToDetails) openDeleteEventModal=(action openDeleteEventModal)}}`);
    assert.ok(this.element.textContent.trim().includes(''));
  });
});
