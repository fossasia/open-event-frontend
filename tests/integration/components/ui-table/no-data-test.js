import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/no data', function(hooks) {
  setupRenderingTest(hooks);
  const messages = { noDataToShow: 'No' };
  test('it renders', function(assert) {
    this.set('messages', messages);
    this.render(hbs `{{ui-table/no-data messages=messages}}`);
    assert.ok(find('*').innerHTML.trim().includes('No'));
  });
});
