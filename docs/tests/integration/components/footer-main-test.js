import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | footer main', function(hooks) {
  setupIntegrationTest(hooks);


  test('it renders', async function(assert) {
    await render(hbs`{{footer-main l10n=l10n}}`);
    assert.ok(this.element.innerHTML.trim().includes('footer'));
  });
});
