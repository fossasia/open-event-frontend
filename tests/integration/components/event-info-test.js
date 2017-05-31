import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event-info', 'Integration | Component | event info');

test('it renders', function(assert) {
  this.render(hbs`{{event-info}}`);
  assert.ok(this.$().text().trim(), 'event-info');
});
