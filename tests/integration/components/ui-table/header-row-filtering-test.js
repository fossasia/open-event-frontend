import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/header row filtering', function(hooks) {
  setupRenderingTest(hooks);

  const processedColumns = [{ isVisible: true, templateForFilterCell: '', componentForFilterCell: '', useFilter: true, filterWithSelect: '' }];
  test('it renders', function(assert) {
    this.set('processedColumns', processedColumns);
    this.render(hbs `{{ui-table/header-row-filtering}} processedColumns=processedColumns`);
    assert.ok(find('*').innerHTML.trim().includes(''));
  });
});
