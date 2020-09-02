import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/header sorting icons', function(hooks) {
  setupIntegrationTest(hooks);

  const column = { sortAsc: true };
  test('it renders', async function(assert) {
    this.set('column', column);
    await render(hbs `{{ui-table/header-sorting-icons column=column}}`);
    assert.ok(this.element.innerHTML.trim().includes('caret'));
  });
});
