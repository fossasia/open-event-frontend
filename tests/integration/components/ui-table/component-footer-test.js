import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/component footer', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('footer', 'footer');
    this.render(hbs `{{ui-table/component-footer summary=footer}}`);
    assert.ok(find('*').innerHTML.trim().includes('footer'));
  });
});
