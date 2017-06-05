import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('settings/email-preferences-section', 'Integration | Component | settings/email preferences section');

test('it renders', function(assert) {
  this.render(hbs`{{settings/email-preferences-section}}`);
  assert.ok(this.$().html().trim().includes('Email'));
});
