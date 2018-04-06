
import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | url-encode', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('inputValue', 'hello world');
    this.render(hbs`{{url-encode inputValue}}`);
    assert.equal(find('*').textContent.trim(), 'hello%20world');
  });
});

