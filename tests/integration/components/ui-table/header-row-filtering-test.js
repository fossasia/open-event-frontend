import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/header row filtering', function(hooks) {
  setupIntegrationTest(hooks);

  const processedColumns = [{ isVisible: true, templateForFilterCell: '', componentForFilterCell: '', useFilter: true, filterWithSelect: '' }];
  test('it renders', async function(assert) {
    this.set('processedColumns', processedColumns);
    await render(hbs `{{ui-table/header-row-filtering}} processedColumns=processedColumns`);
    assert.ok(this.element.innerHTML.trim().includes(''));
  });
});
