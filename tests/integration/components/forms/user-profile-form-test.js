import { test } from 'ember-qunit';
import Ember from 'ember';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/user-profile-form', 'Integration | Component | forms/user profile form');

const { Object: EmberObject } = Ember;

var user = EmberObject.create({
  firstName : 'Test',
  lastName  : 'User',
  details   : 'This is a test'
});

test('it renders', function(assert) {
  this.set('user', user);
  this.render(hbs`{{forms/user-profile-form user=user l10n=l10n}}`);
  assert.ok(this.$().html().trim().includes('Test'));
});
