
import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('currency-name', 'helper:currency-name');
test('it renders', function(assert) {
  this.set('inputValue', 'USD');

  this.render(hbs`{{currency-name inputValue}}`);

  assert.equal(this.$().text().trim(), 'United States dollar');
});

