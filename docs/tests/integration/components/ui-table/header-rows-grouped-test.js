import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/header rows grouped', function(hooks) {
  setupIntegrationTest(hooks);

  const groupedHeaders = [[{ title: 'Cat1' }], [{ title: 'Cat2' }]];
  test('it renders', async function(assert) {
    this.set('groupedHeaders', groupedHeaders);
    await render(hbs `{{ui-table/header-rows-grouped groupedHeaders=groupedHeaders}}`);
    assert.ok(this.element.innerHTML.trim().includes('Cat1'));
  });
});
