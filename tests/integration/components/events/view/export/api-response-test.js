import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/view/export/api-response', 'Integration | Component | events/view/export/api response');

test('it renders', function(assert) {
  this.render(hbs`{{events/view/export/api-response i18n=i18n}}`);
  assert.ok(this.$().html().trim().includes('Access event information'));
});
