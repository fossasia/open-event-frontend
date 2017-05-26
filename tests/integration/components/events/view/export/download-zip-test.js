import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/view/export/download-zip', 'Integration | Component | events/view/export/download zip');

test('it renders', function(assert) {
  this.render(hbs`{{events/view/export/download-zip i18n=i18n}}`);
  assert.ok(this.$().html().trim().includes('Zip'));
});
