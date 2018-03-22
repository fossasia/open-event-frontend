import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/cell/events/view/speakers/cell-simple-sessions', 'Integration | Component | ui table/cell/events/view/speakers/cell simple sessions');

test('it renders', function(assert) {
  this.render(hbs`{{ui-table/cell/events/view/speakers/cell-simple-sessions}}`);
  assert.ok(this.$().text().trim().includes(''));
});
