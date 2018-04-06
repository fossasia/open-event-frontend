
import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | currency-name', function(hooks) {
  setupRenderingTest(hooks);
  test('it renders', function(assert) {
    this.set('inputValue', 'USD');

    this.render(hbs`{{currency-name inputValue}}`);

    assert.equal(find('*').textContent.trim(), 'United States dollar');
  });
});

