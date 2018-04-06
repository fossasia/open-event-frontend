import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | tabbed navigation', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(
      hbs `{{#tabbed-navigation}}
        {{#link-to 'events.view.index' class='item'}}
          {{t 'Overview'}}
        {{/link-to}}
      {{/tabbed-navigation}}`);

    assert.ok(find('*').innerHTML.trim().includes('Overview'));
  });
});
