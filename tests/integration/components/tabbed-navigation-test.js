import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | tabbed navigation', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(
      hbs `{{#tabbed-navigation}}
        {{#link-to 'events.view.index' 122 class='item'}}
          {{t 'Overview'}}
        {{/link-to}}
      {{/tabbed-navigation}}`);

    assert.dom(this.element).includesText('Overview');
  });
});
