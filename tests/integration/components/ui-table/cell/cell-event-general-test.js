import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell event general', function(hooks) {
  setupIntegrationTest(hooks);

  const extraRecords = { identifier: 'abc215f', logoUrl: 'url' };
  const record = 'Event';

  const props = {
    actions: {
      editEvent     : () => {},
      moveToDetails : () => {},
      moveToPublic  : () => {}
    }
  };

  test('it renders', async function(assert) {

    this.setProperties({
      record,
      props,
      extraRecords
    });

    await render(hbs`{{ui-table/cell/cell-event-general extraRecords=extraRecords record=record props=props}}`);
    assert.ok(this.element.textContent.trim().includes('Event'));
  });
});
