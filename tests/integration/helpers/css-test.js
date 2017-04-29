
import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('css', 'helper:css');

// Replace this with your real tests.
test('it renders', function(assert) {
  this.render(hbs`{{css background-color='#ffffff' color='#000000'}}`);
  assert.equal(this.$().text().trim(), 'background-color: #ffffff;color: #000000;');
});

