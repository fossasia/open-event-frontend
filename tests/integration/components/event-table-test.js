import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('event-table', 'Integration | Component | event table');

test('it renders', function(assert) {

  this.render(hbs`{{event-table i18n=i18n}}`);
  assert.ok(this.$().html().trim().includes('Roles'));
});
