import { test } from 'ember-qunit';
import Ember from 'ember';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/overview/manage-roles', 'Integration | Component | events/overview/manage roles');

const { Object: EmberObject, A } = Ember;

let roleInvites = A(
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

test('it renders', function(assert) {
  this.set('roleInvites', roleInvites);
  this.render(hbs`{{events/view/overview/manage-roles data=roleInvites}}`);
  assert.ok(this.$().html().trim().includes('Manage roles'));
});
