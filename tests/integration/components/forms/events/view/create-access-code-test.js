import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/events/view/create-access-code', 'Integration | Component | forms/events/view/create access code');

test('it renders', function(assert) {
  this.render(hbs`{{forms/events/view/create-access-code routing=routing}}`);
  assert.ok(this.$().html().trim().includes('Save'));
});
