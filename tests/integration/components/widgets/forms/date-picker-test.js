import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | widgets/forms/date picker', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{widgets/forms/date-picker}}`);
    assert.ok(find('*').innerHTML.trim().includes('calendar'));
  });
});
