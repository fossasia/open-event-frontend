import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('side-bar', 'Integration | Component | side bar');

test('it renders', function(assert) {
  this.render(hbs`
    {{#side-bar}}
      template block text
    {{/side-bar}}
  `);
  assert.ok(this.$().text().trim().includes('template block text'));
});
