import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('notification-dropdown', 'Integration | Component | notification dropdown');

test('it renders', function(assert) {
  this.render(hbs`{{notification-dropdown i18n=i18n}}`);
  assert.ok(this.$().text().trim().includes('Mark all as Read'));
});
