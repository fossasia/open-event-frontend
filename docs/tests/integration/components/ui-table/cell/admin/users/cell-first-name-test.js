import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/admin/users/cell first name', function(hooks) {
  setupIntegrationTest(hooks);
  const props = {
    actions: {
      moveToUserDetails : () => {},
      deleteUser        : () => {},
      openEditModal     : () => {},
      restoreUser       : () => {}
    }
  };
  test('it renders', async function(assert) {
    this.set('props', props);
    await render(hbs`{{ui-table/cell/admin/users/cell-first-name props=props}}`);
    assert.ok(this.element.innerHTML.trim().includes(''));
  });
});
