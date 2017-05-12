import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/imports-history-section', 'Integration | Component | events/imports history section');

test('it renders', function(assert) {
  this.render(hbs `{{events/imports-history-section}}`);
  assert.ok(this.$().html().trim().includes('Previous Events'));
});
