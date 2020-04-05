import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell sponsor options', function(hooks) {
  setupIntegrationTest(hooks);

  const props = {
    actions: {
      editSponsor   : () => {},
      deleteSponsor : () => {}
    }
  };

  test('it renders', async function(assert) {

    this.setProperties({
      props
    });

    await render(hbs`{{ui-table/cell/cell-sponsor-options props=props }}`);
    assert.ok(this.element.textContent.trim().includes(''));
  });
});
