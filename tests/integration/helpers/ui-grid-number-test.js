
import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-grid-number', 'helper:ui-grid-number');

test('it renders', function(assert) {
  this.set('inputValue', 2);
  this.render(hbs`{{ui-grid-number inputValue}}`);
  assert.equal(this.$().text().trim(), 'two');
});

