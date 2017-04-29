import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('increment', 'helper:increment');

test('it renders', function(assert) {
  this.set('inputValue', 1);
  this.render(hbs`{{increment inputValue}}`);
  assert.equal(this.$().text().trim(), '2');
  this.render(hbs`{{increment inputValue 3}}`);
  assert.equal(this.$().text().trim(), '4');
  this.render(hbs`{{increment 'aa'}}`);
  assert.equal(this.$().text().trim(), 'aa');
});

