import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell sessions', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs `{{ui-table/cell/cell-sessions}}`);
    if (this.element.innerHTML.trim().includes('Submitted')) {
      assert.notOk(this.element.innerHTML.trim().includes('No Session Information Added Yet'));
      assert.ok(this.element.innerHTML.trim().includes('Submitted'));
    } else {
      assert.notOk(this.element.innerHTML.trim().includes('Submitted'));
      assert.ok(this.element.innerHTML.trim().includes('No Session Information Added Yet'));
    }
  });
});
