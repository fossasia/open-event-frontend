import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | side bar', function(hooks) {
  setupRenderingTest(hooks);

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
    assert.ok(find('*').textContent.trim().includes('Browse Events'));
  });
});
