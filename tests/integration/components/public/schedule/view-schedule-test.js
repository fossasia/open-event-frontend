import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public/schedule/view-schedule', 'Integration | Component | public/schedule/view schedule');

test('it renders', function(assert) {

  this.render(hbs`{{public/schedule/view-schedule}}`);
  assert.ok(this.$().html().trim().includes(''));
});
