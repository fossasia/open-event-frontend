import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | events/view/overview/event apps', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{events/view/overview/event-apps}}`);
    assert.ok(find('*').innerHTML.trim().includes('Apps'));
  });
});
