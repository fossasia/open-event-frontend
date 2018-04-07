import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | session card', function(hooks) {
  setupIntegrationTest(hooks);

  const session = EmberObject.create({ title: 'Super cool JS', state: 'rejected', event: 'OS Tech', startsAt: new Date(), endsAt: new Date() });
  test('it renders', async function(assert) {
    this.set('session', session);
    await render(hbs`{{session-card session=session}}`);
    assert.ok(this.element.innerHTML.trim().includes('rejected'));
  });
});
