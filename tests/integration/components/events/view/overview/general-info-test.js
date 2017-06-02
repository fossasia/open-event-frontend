import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/overview/general-info', 'Integration | Component | events/overview/general info');

test('it renders', function(assert) {
  this.render(hbs`{{events/view/overview/general-info}}`);
  assert.ok(this.$().html().trim().includes('General info'));
});
