
import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('url-encode', 'helper:url-encode');

test('it renders', function(assert) {
  this.set('inputValue', 'hello world');
  this.render(hbs`{{url-encode inputValue}}`);
  assert.equal(this.$().text().trim(), 'hello%20world');
});

