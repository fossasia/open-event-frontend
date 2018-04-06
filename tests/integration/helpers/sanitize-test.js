
import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | sanitize', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.set('inputValue', '<p>hello</p>');
    this.render(hbs`{{sanitize inputValue}}`);
    assert.equal(find('*').innerHTML.trim(), '<p>hello</p>');
    this.set('inputValue', '<script>alert("xss");</script>');
    this.render(hbs`{{sanitize inputValue}}`);
    assert.equal(find('*').innerHTML.trim(), '');
  });
});

