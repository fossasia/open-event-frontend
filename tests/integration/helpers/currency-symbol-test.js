
import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('currency-symbol', 'helper:currency-symbol');

test('it renders', function(assert) {
  this.set('inputValue', 'USD');

  this.render(hbs`{{currency-symbol inputValue}}`);

  assert.equal(this.$().text().trim(), 'US$');
});

