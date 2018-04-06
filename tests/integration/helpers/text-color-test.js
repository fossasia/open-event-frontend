
import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | text-color', function(hooks) {
  setupRenderingTest(hooks);


  test('it renders', function(assert) {
    this.render(hbs`{{text-color '#000000'}}`);
    assert.equal(find('*').textContent.trim(), '#FFFFFF');
    this.render(hbs`{{text-color '#FFFFFF'}}`);
    assert.equal(find('*').textContent.trim(), '#000000');
  });
});

