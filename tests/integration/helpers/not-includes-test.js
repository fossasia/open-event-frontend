import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('not-includes', 'helper:not-includes');

test('it works', function(assert) {
  this.set('targetString', 'this is a string');
  this.set('testString', 'is a');
  this.render(hbs`{{if (not-includes targetString testString) 'the target does not have the test string' 'the target has the test string'}}`);
  assert.equal(this.$().text().trim(), 'the target has the test string');

  this.set('testString', 'xyzzy');
  this.render(hbs`{{if (not-includes targetString testString) 'the target does not have the test string' 'the target has the test string'}}`);
  assert.equal(this.$().text().trim(), 'the target does not have the test string');
});

test('it fails graciously', function(assert) {
  this.render(hbs`{{if (not-includes 122 44) 'the target does not have the test string' 'the target has the test string'}}`);
  assert.equal(this.$().text().trim(), 'the target does not have the test string');

  this.render(hbs`{{if (not-includes null null) 'the target does not have the test string' 'the target has the test string'}}`);
  assert.equal(this.$().text().trim(), 'the target does not have the test string');
});

