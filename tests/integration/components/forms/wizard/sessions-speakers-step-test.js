import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/wizard/sessions-speakers-step', 'Integration | Component | forms/wizard/sessions speakers step');

test('it renders', function(assert) {
  this.render(hbs`{{forms/wizard/sessions-speakers-step}}`);
  assert.ok(this.$().html().trim().includes('Session'));
});
