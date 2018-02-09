import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/no-data', 'Integration | Component | ui table/no data');
const messages = { noDataToShow: 'No' };
test('it renders', function(assert) {
  this.set('messages', messages);
  this.render(hbs `{{ui-table/no-data messages=messages}}`);
  assert.ok(this.$().html().trim().includes('No'));
});
