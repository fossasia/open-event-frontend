
import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('text-color', 'helper:text-color');

// Replace this with your real tests.
test('it renders', function(assert) {
  this.render(hbs`{{text-color '#000000'}}`);
  assert.equal(this.$().text().trim(), '#FFFFFF');
  this.render(hbs`{{text-color '#FFFFFF'}}`);
  assert.equal(this.$().text().trim(), '#000000');
});

