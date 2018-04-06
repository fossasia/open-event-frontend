import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | errors/not found', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{errors/not-found}}`);
    assert.ok(find('*').innerHTML.trim().includes('404'));
  });
});
