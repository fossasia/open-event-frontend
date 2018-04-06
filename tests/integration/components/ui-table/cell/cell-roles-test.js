import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui table/cell/cell roles', function(hooks) {
  setupRenderingTest(hooks);

  const record = { roles: [{ type: 'Organiser', email: 'sample@sample.com' }] };

  test('it renders', function(assert) {
    this.set('record', record);
    this.render(hbs `{{ui-table/cell/cell-roles record=record}}`);
    assert.ok(find('*').innerHTML.trim().includes(''));
  });
});
