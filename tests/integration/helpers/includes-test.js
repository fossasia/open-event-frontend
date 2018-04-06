import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | includes', function(hooks) {
  setupRenderingTest(hooks);

  test('it works', function(assert) {
    this.set('targetString', 'this is a string');
    this.set('testString', 'is a');
    this.render(hbs`{{if (includes targetString testString) 'the target has the test string' 'the target does not have the test string'}}`);
    assert.equal(find('*').textContent.trim(), 'the target has the test string');

    this.set('testString', 'xyzzy');
    this.render(hbs`{{if (includes targetString testString) 'the target has the test string' 'the target does not have the test string'}}`);
    assert.equal(find('*').textContent.trim(), 'the target does not have the test string');
  });

  test('it fails graciously', function(assert) {
    this.render(hbs`{{if (includes 122 44) 'the target has the test string' 'the target does not have the test string'}}`);
    assert.equal(find('*').textContent.trim(), 'the target does not have the test string');

    this.render(hbs`{{if (includes null null) 'the target has the test string' 'the target does not have the test string'}}`);
    assert.equal(find('*').textContent.trim(), 'the target does not have the test string');
  });
});

