import { test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';

moduleForComponent('public/side-menu', 'Integration | Component | public/side menu');

test('it renders', function(assert) {
  this.render(hbs`{{public/side-menu}}`);
  assert.ok(this.$().html().trim().includes('ui fluid vertical pointing menu'));
  assert.ok(this.$().html().trim().includes('Getting here'));
});
