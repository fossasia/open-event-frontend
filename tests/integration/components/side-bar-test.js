import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | side bar', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{#side-bar}}
        <div class="ui sidebar">
          <div class="item"></div>
        </div>
        <div class="open sidebar"></div>
        <div class="main-container">Search text</div>
      {{/side-bar}}
    `);
    assert.dom(this.element).includesText('Search text');
  });
});
