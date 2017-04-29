import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('decrement', 'helper:decrement');

test('it renders', function(assert) {
  this.set('inputValue', 2);
  this.render(hbs`{{decrement inputValue}}`);
  assert.equal(this.$().text().trim(), '1');
  this.render(hbs`{{decrement inputValue 2}}`);
  assert.equal(this.$().text().trim(), '0');
  this.render(hbs`{{decrement 'bb'}}`);
  assert.equal(this.$().text().trim(), 'bb');
});

