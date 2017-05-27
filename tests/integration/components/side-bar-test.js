import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('side-bar', 'Integration | Component | side bar');

test('it renders', function(assert) {
  this.render(hbs`
    {{#side-bar}}
      <div class="ui sidebar">
        <div class="item"></div>
      </div>
      <div class="open sidebar"></div>
      <div class="main-container">Search text</div>
    {{/side-bar}}
  `);
  assert.ok(this.$().text().trim().includes('Browse Events'));
});
