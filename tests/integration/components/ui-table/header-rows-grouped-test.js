import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/header rows grouped', function(hooks) {
  setupRenderingTest(hooks);

  const groupedHeaders = [[{ title: 'Cat1' }], [{ title: 'Cat2' }]];
  test('it renders', function(assert) {
    this.set('groupedHeaders', groupedHeaders);
    this.render(hbs `{{ui-table/header-rows-grouped groupedHeaders=groupedHeaders}}`);
    assert.ok(find('*').innerHTML.trim().includes('Cat1'));
  });
});
