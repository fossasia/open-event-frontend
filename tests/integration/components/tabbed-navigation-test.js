import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tabbed-navigation', 'Integration | Component | tabbed navigation');

test('it renders', function(assert) {
  this.render(
    hbs `{{#tabbed-navigation}}
      {{#link-to 'events.view.index' class='item'}}
        {{t 'Overview'}}
      {{/link-to}}
    {{/tabbed-navigation}}`);

  assert.ok(this.$().html().trim().includes('Overview'));
});
