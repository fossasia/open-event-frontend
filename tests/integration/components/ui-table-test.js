import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table', 'Integration | Component | ui table');

const columns = [{ propertyName: 'name', template: 'components/ui-table/cell/cell-event', title: 'Name' }];
const data = [{ name: 'user1' }];
test('it renders', function(assert) {
  this.set('columns', columns);
  this.set('data', data);
  this.render(hbs `{{ui-table columns=columns data=data showColumnsDropdown=true}}`);
  assert.ok(this.$().html().trim().includes('Name'));
});
