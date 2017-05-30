import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/header-row-filtering', 'Integration | Component | ui table/header row filtering');

const processedColumns = [{ isVisible: true, templateForFilterCell: '', componentForFilterCell: '', useFilter: true, filterWithSelect: '' }];
test('it renders', function(assert) {
  this.set('processedColumns', processedColumns);
  this.render(hbs `{{ui-table/header-row-filtering}} processedColumns=processedColumns`);
  assert.ok(this.$().html().trim().includes(''));
});
