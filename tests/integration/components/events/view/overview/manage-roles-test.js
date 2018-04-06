import { find } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | events/overview/manage roles', function(hooks) {
  setupRenderingTest(hooks);

  let invites = A(
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
  let data = EmberObject.create({
    roleInvites: invites
  });

  test('it renders', function(assert) {
    this.set('data', data);
    this.render(hbs`{{events/view/overview/manage-roles data=data}}`);
    assert.ok(find('*').innerHTML.trim().includes('Manage roles'));
  });
});
