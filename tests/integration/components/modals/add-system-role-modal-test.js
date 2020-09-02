import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | modals/add system role modal', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('isOpen', false);
    await render(hbs`{{modals/add-system-role-modal isOpen=isOpen isNew=true}}`);
    assert.ok(this.element.innerHTML.trim().includes('Add New System Role'));
  });
});
