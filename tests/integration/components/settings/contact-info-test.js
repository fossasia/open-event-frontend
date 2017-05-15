import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('settings/contact-info-section', 'Integration | Component | settings/contact info section');

test('it renders', function(assert) {
  this.render(hbs`{{settings/contact-info-section}}`);
  assert.ok(this.$().html().trim().includes('Email'));
});
