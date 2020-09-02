import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/component footer', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('footer', 'footer');
    await render(hbs `{{ui-table/component-footer summary=footer}}`);
    assert.ok(this.element.innerHTML.trim().includes('footer'));
  });
});
