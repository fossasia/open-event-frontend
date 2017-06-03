import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-table/component-footer', 'Integration | Component | ui table/component footer');

test('it renders', function(assert) {
  this.set('footer', 'footer');
  this.render(hbs `{{ui-table/component-footer summary=footer}}`);
  assert.ok(this.$().html().trim().includes('footer'));
});
