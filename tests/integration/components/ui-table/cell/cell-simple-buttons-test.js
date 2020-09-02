import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell simple buttons', function(hooks) {
  setupIntegrationTest(hooks);
  const props = {
    actions: {
      deleteSession : () => {},
      editSession   : () => {},
      viewSession   : () => {}
    }
  };
  test('it renders', async function(assert) {

    this.set('props', props);
    await render(hbs`{{ui-table/cell/cell-simple-buttons props=props}}`);
    assert.ok(this.element.innerHTML.trim().includes(''));
  });
});
