import { hbs } from 'ember-cli-htmlbars';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';

module('Integration | Component | public/social links', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('externalEventUrl', 'https://example.com');
    await render(hbs`{{public/social-links externalUrl=externalEventUrl}}`);
    assert.ok(this.element.innerHTML.trim().includes('https://example.com'));
  });
});
