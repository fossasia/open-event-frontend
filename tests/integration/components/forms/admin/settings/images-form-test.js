import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | forms/admin/settings/images form', function(hooks) {
  setupIntegrationTest(hooks);

  const images = [{ type: 'event', logoWidth: 10 }];

  test('it renders', async function(assert) {
    this.set('images', images);
    await render(hbs`{{forms/admin/settings/images-form images=images}}`);
    assert.ok(this.element.innerHTML.trim().includes('Event Images'));
  });
});
