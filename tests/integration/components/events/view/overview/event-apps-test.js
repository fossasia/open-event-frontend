import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';
import EmberObject from '@ember/object';

module('Integration | Component | events/view/overview/event apps', function(hooks) {
  setupIntegrationTest(hooks);

  const currentUser = EmberObject.create({ email: 'test1@gmail.com' });
  const authManager = EmberObject.create({ currentUser });
  test('it renders', async function(assert) {
    this.set('authManager', authManager);
    this.set('eventId', 'e123');
    await render(hbs`{{events/view/overview/event-apps authManager=authManager eventId=eventId}}`);
    assert.ok(this.element.innerHTML.trim().includes('Website'));
  });
});
