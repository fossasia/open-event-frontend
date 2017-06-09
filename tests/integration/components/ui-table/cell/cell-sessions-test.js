import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/cell-sessions', 'Integration | Component | ui table/cell/cell sessions');

const record = { sessions: [{ type: 'Drafts', number: 1 }] };

test('it renders', function(assert) {
  this.set('record', record);
  this.render(hbs `{{ui-table/cell/cell-sessions record=record}}`);
  assert.ok(this.$().html().trim().includes('Drafts'));
});
