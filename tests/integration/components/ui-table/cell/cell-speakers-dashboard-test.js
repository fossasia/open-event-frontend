import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | ui table/cell/cell speakers dashboard', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs `{{ui-table/cell/cell-speakers-dashboard}}`);
    if (this.element.innerHTML.trim().includes('Accepted')) {
      assert.notOk(this.element.innerHTML.trim().includes('No Speaker Added Yet'));
      assert.ok(this.element.innerHTML.trim().includes('Accepted'));
    } else {
      assert.notOk(this.element.innerHTML.trim().includes('Accepted'));
      assert.ok(this.element.innerHTML.trim().includes('No Speaker Added Yet'));
    }
  });
});
