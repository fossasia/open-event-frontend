import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/admin/reports/system-logs/notification-logs/cell-sanitize', 'Integration | Component | ui table/cell/admin/reports/system logs/notification logs/cell sanitize');

test('it renders', function(assert) {
  this.render(hbs`{{ui-table/cell/admin/reports/system-logs/notification-logs/cell-sanitize}}`);
  assert.ok(this.$().text().trim().includes(''));
});
