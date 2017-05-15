import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/event-import-section', 'Integration | Component | events/event import section');

test('it renders', function(assert) {
  this.render(hbs `{{events/event-import-section}}`);
  assert.ok(this.$().html().trim().includes('Import Event'));
});