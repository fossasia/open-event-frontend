import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('settings/application-section', 'Integration | Component | settings/application section');

test('it renders', function(assert) {
  this.render(hbs`{{settings/application-section}}`);
  assert.ok(this.$().html().trim().includes('Connect'));
});
