import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | isSubstring', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('longString', 'this is the long string')
    this.set('shortString', 'is')
    await render(hbs`{{if (isSubstring targetString testString) 'the target has the test string' 'the target does not have the test string'}}`);
    assert.equal(this.element.textContent, 'the target has the test string');
  });
});
