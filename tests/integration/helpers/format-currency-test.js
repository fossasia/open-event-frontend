
import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-currency', 'helper:format-currency');

test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{format-currency inputValue}}`);

  assert.equal(this.$().text().trim(), '$ 1234.00');
});
