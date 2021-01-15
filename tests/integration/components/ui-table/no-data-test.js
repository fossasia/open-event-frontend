import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/no data', function(hooks) {
  setupIntegrationTest(hooks);
  const themeInstance = {
    messages: {
      noDataToShow: 'No'
    } };
  test('it renders', async function(assert) {
    this.set('themeInstance', themeInstance);
    await render(hbs `{{ui-table/no-data themeInstance=themeInstance}}`);
    assert.ok(this.element.innerHTML.trim().includes('No'));
  });
});
