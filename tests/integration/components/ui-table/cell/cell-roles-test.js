import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell roles', function(hooks) {
  setupIntegrationTest(hooks);

  const record = { roles: [{ type: 'Organiser', email: 'sample@sample.com' }] };

  test('it renders', async function(assert) {
    this.set('record', record);
    await render(hbs `{{ui-table/cell/cell-roles record=record}}`);
    assert.ok(this.element.innerHTML.trim().includes(''));
  });
});
