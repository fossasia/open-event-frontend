import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | tabbed navigation', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(
      hbs `{{#tabbed-navigation}}
        {{#link-to 'events.view.index' class='item'}}
          {{t 'Overview'}}
        {{/link-to}}
      {{/tabbed-navigation}}`);

    assert.ok(this.element.innerHTML.trim().includes('Overview'));
  });
});
