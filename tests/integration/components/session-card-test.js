import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | session card', function(hooks) {
  setupIntegrationTest(hooks);

  const session = EmberObject.create({ id: 123, title: 'Super cool JS', state: 'rejected', event: { name: 'OS Tech', id: 123 }, startsAt: new Date(), endsAt: new Date() });

  test('it renders', async function(assert) {
    this.set('session', session);
    await render(hbs`{{session-card session=session}}`);
    assert.dom(this.element).includesText('Rejected');
  });
});
