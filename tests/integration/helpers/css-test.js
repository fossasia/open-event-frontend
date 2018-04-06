import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | css', function(hooks) {
  setupRenderingTest(hooks);
  test('it renders', function(assert) {
    this.render(hbs`{{css background-color='#ffffff' color='#000000'}}`);
    assert.equal(find('*').textContent.trim(), 'background-color: #ffffff;color: #000000;');
  });
});

