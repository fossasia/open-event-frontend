import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | events/overview/manage roles', function(hooks) {
  setupIntegrationTest(hooks);

  const invites = A(
    [
      EmberObject.create({
        email    : 'test@test.com',
        status   : 'accepted',
        roleName : 'organizer'
      }),
      EmberObject.create({
        email    : 'test@test.com',
        status   : 'pending',
        roleName : 'co-organizer'
      })
    ]
  );
  const data = EmberObject.create({
    roleInvites: invites
  });

  test('it renders', async function(assert) {
    this.set('data', data);
    await render(hbs`{{events/view/overview/manage-roles data=data}}`);
    assert.dom(this.element).includesText('Team Members');
  });
});
