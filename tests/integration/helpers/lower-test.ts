import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | lower', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function(assert) {
    this.set('inputValue', 'TaTa@exAmPle.com');

    await render(hbs`{{lower inputValue}}`);

    assert.equal(this.element.textContent?.trim(), 'tata@example.com');
  });
});
