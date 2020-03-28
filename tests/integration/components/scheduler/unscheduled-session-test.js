import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';

module('Integration | Component | scheduler/unscheduled session', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {
    this.set('session', {
      track: {
        color: '#fff333'
      }
    });
    await render(hbs`{{scheduler/unscheduled-session session=session}}`);
    assert.ok(this.element.innerHTML.trim().includes('|'));
  });
});
