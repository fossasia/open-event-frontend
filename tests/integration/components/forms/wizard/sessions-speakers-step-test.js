import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | forms/wizard/sessions speakers step', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{forms/wizard/sessions-speakers-step}}`);
    assert.ok(find('*').innerHTML.trim().includes('Session'));
  });
});
