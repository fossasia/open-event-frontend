
import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | ui-grid-number', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('inputValue', 2);
    this.render(hbs`{{ui-grid-number inputValue}}`);
    assert.equal(find('*').textContent.trim(), 'two');
  });
});

