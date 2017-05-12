import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/events-table', 'Integration | Component | events/events table');

test('it renders', function(assert) {
  this.render(hbs`{{events/events-table i18n=i18n}}`);
  assert.ok(this.$().html().trim().includes('Roles'));
});
