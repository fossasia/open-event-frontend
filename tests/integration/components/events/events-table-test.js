import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | events/events table', function(hooks) {
  setupRenderingTest(hooks);
  const columns = [{ propertyName: 'name', template: 'components/ui-table/cell/cell-event', title: 'Name' }];
  const data = [{ name: 'user1' }];
  test('it renders', function(assert) {
    this.set('columns', columns);
    this.set('data', data);
    this.render(hbs `{{events/events-table columns=columns data=data showColumnsDropdown=true}}`);
    assert.ok(find('*').innerHTML.trim().includes('Name'));
  });
});
