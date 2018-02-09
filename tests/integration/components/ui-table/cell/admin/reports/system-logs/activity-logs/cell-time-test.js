import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/admin/reports/system-logs/activity-logs/cell-time', 'Integration | Component | ui table/cell/admin/reports/system logs/activity logs/cell time');

test('it renders', function(assert) {

  this.render(hbs`{{ui-table/cell/admin/reports/system-logs/activity-logs/cell-time}}`);
  assert.ok(this.$().text().trim().includes(''));

});
