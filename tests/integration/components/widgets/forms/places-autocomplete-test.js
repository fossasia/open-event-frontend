import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | widgets/forms/places autocomplete', function(hooks) {
  setupIntegrationTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    this.actions.placeChanged = function() { };
    await render(hbs`{{widgets/forms/places-autocomplete placeChangedCallback=(action 'placeChanged')}}`);
    assert.ok(this.element.innerHTML.trim().includes('place-autocomplete--input'));
  });
});
