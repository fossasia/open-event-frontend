import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/cell/events/views/sessions/cell buttons', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {

    this.render(hbs`{{ui-table/cell/events/views/sessions/cell-buttons}}`);
    assert.ok(find('*').innerHTML.trim().includes(''));

  });
});
