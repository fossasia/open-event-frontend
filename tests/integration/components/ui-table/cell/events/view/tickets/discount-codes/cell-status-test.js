import { find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

module('Integration | Component | ui table/cell/events/view/tickets/discount codes/cell status', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {

    this.render(hbs`{{ui-table/cell/events/view/tickets/discount-codes/cell-status}}`);
    assert.ok(find('*').textContent.trim().includes(''));

  });
});
