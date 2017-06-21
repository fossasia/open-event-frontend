import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/view/overview/event-apps', 'Integration | Component | events/view/overview/event apps');

test('it renders', function(assert) {
  this.render(hbs`{{events/view/overview/event-apps}}`);
  assert.ok(this.$().html().trim().includes('Apps'));
});
