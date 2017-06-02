import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/overview/event-sponsors', 'Integration | Component | events/overview/event sponsors');

test('it renders', function(assert) {
  this.render(hbs`{{events/view/overview/event-sponsors}}`);
  assert.ok(this.$().html().trim().includes('Event sponsors'));
});
