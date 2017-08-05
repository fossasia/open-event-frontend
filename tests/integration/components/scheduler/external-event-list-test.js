import { test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';

moduleForComponent('scheduler/external-event-list', 'Integration | Component | scheduler/external event list');

test('it renders', function(assert) {
  this.render(hbs`{{scheduler/external-event-list}}`);
  assert.ok(this.$().html().trim().includes('Events'));
});
