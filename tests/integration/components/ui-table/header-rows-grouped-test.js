import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/header-rows-grouped', 'Integration | Component | ui table/header rows grouped');

const groupedHeaders = [[{ title: 'Cat1' }], [{ title: 'Cat2' }]];
test('it renders', function(assert) {
  this.set('groupedHeaders', groupedHeaders);
  this.render(hbs `{{ui-table/header-rows-grouped groupedHeaders=groupedHeaders}}`);
  assert.ok(this.$().html().trim().includes('Cat1'));
});
