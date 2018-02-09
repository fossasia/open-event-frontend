import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('footer-main', 'Integration | Component | footer main');

test('it renders', function(assert) {
  this.render(hbs`{{footer-main l10n=l10n}}`);
  assert.ok(this.$().html().trim().includes('footer'));
});
