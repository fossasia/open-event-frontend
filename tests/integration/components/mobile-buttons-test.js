import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mobile-buttons', 'Integration | Component | mobile buttons');

test('it renders', function(assert) {
  this.render(hbs`
    {{#mobile-buttons}}
      <div class="ui button">
      {{t 'All'}}
      </div>
    {{/mobile-buttons}}
  `);

  assert.ok(this.$().html().trim().includes('All'));
});
