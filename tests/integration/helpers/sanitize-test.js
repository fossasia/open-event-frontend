
import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sanitize', 'helper:sanitize');

test('it renders', function(assert) {
  this.set('inputValue', '<p>hello</p>');
  this.render(hbs`{{sanitize inputValue}}`);
  assert.equal(this.$().html().trim(), '<p>hello</p>');
  this.set('inputValue', '<script>alert("xss");</script>');
  this.render(hbs`{{sanitize inputValue}}`);
  assert.equal(this.$().html().trim(), '');
});

