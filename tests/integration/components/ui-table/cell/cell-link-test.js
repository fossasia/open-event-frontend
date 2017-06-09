import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/cell-link', 'Integration | Component | ui table/cell/cell link');

const record = { url: 'Event' };
test('it renders', function(assert) {
  this.set('record', record);
  this.render(hbs `{{ui-table/cell/cell-link record=record}}`);
  assert.ok(this.$().html().trim().includes('Event'));
});
