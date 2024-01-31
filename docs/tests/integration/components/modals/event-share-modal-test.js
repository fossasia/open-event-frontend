import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | modals/event share modal', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('isOpen', false);
    this.set('event', {});
    await render(hbs`{{modals/event-share-modal isOpen=isOpen event=event}}`);
    assert.ok(this.element.innerHTML.trim().includes('Share this event'));
  });
});
