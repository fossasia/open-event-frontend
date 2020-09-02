import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell link', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('record', 'https://url.test');
    await render(hbs `{{ui-table/cell/cell-link record=record}}`);
    assert.ok(this.element.innerHTML.trim().includes('https://url.test'));
  });
});

