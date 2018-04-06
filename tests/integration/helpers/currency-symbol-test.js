
import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | currency-symbol', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('inputValue', 'USD');

    this.render(hbs`{{currency-symbol inputValue}}`);

    assert.equal(find('*').textContent.trim(), 'US$');
  });
});

