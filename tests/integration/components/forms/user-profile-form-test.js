import { find } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | forms/user profile form', function(hooks) {
  setupRenderingTest(hooks);

  var user = EmberObject.create({
    firstName : 'Test',
    lastName  : 'User',
    details   : 'This is a test'
  });

  test('it renders', function(assert) {
    this.set('user', user);
    this.render(hbs`{{forms/user-profile-form user=user l10n=l10n}}`);
    assert.ok(find('*').innerHTML.trim().includes('Test'));
  });
});
