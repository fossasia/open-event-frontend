import { find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | public/side menu', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{public/side-menu}}`);
    assert.ok(find('*').innerHTML.trim().includes('ui fluid vertical pointing menu'));
    assert.ok(find('*').innerHTML.trim().includes('Getting here'));
  });
});
