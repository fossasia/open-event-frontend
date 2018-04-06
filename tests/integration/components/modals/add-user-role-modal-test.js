import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | modals/add user role modal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('isOpen', false);
    this.render(hbs`{{modals/add-user-role-modal isOpen=isOpen}}`);
    assert.ok(find('*').innerHTML.trim().includes('Add Role'));
  });
});
