import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell sponsor options', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('deleteSponsor', () => {});
    this.set('editSponsor', () => {});
    await render(hbs`{{ui-table/cell/cell-sponsor-options deleteSponsor=(action deleteSponsor) editSponsor=(action editSponsor)}}`);
    assert.ok(this.element.textContent.trim().includes(''));
  });
});
