import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | forms/wizard/basic details step', function(hooks) {
  setupIntegrationTest(hooks);

  test('it renders', async function(assert) {

    const store = this.owner.lookup('service:store');

    this.set('data', {
      event: run(() => store.createRecord('event'))
    });
    await render(hbs`{{forms/wizard/basic-details-step data=data isCreate=true}}`);
    assert.ok(this.element.innerHTML.trim().includes('location'));
  });
});
