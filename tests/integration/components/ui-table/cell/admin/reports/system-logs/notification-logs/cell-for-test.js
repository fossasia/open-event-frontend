import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/admin/reports/system-logs/notification-logs/cell-for', 'Integration | Component | ui table/cell/admin/reports/system logs/notification logs/cell for');

test('it renders', function(assert) {

  this.render(hbs`{{ui-table/cell/admin/reports/system-logs/notification-logs/cell-for}}`);
  assert.equal(this.$().text().trim(), '');

});
