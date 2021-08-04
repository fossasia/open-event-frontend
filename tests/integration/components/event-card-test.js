import { hbs } from 'ember-cli-htmlbars';
import Object from '@ember/object';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | event card', function(hooks) {
  setupIntegrationTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    this.set('event', Object.create({
      id         : 123,
      identifier : 'abc123'
    }));
    this.actions.shareEvent = function() { };
    await render(hbs`{{event-card event=event isWide=false shareEvent=(action 'shareEvent')}}`);
    assert.ok(this.element.innerHTML.trim().includes('event'));
  });
});
