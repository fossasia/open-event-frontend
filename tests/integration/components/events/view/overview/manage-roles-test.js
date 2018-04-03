import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/overview/manage-roles', 'Integration | Component | events/overview/manage roles');

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
  assert.ok(this.$().html().trim().includes('Manage roles'));
});
