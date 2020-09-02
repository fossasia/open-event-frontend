import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | modals/event delete modal', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('isOpen', false);
    this.set('eventName', 'sample');
    this.set('deleteEvent', () => {});
    await render(hbs`{{modals/event-delete-modal isOpen=isOpen eventName=eventName deleteEvent=(action deleteEvent)}}`);
    assert.ok(this.element.innerHTML.trim().includes('Are you sure'));
  });
});
