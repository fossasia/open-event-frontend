import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell event', function(hooks) {
  setupIntegrationTest(hooks);

  const record = { name: 'Event', image: 'url' };
  const props = {
    actions: {
      openDeleteEventModal : () => {},
      deleteEvent          : () => {},
      restoreEvent         : () => {}
    }
  };
  test('it renders', async function(assert) {
    this.setProperties({
      record,
      props
    });
    await render(hbs `{{ui-table/cell/cell-event record=record props=props}}`);
    assert.ok(this.element.innerHTML.trim().includes('Event'));
  });
});
