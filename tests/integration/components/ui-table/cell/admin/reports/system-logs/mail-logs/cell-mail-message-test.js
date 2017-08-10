import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/admin/reports/system-logs/mail-logs/cell-mail-message', 'Integration | Component | ui table/cell/admin/reports/system logs/mail logs/cell mail message');

const record = { message: 'Hello', subject: 'New User' };

test('it renders', function(assert) {
  this.set('record', record);
  this.render(hbs `{{ui-table/cell/admin/reports/system-logs/mail-logs/cell-mail-message record=record}}`);
  assert.ok(this.$().html().trim().includes('Hello'));
});
