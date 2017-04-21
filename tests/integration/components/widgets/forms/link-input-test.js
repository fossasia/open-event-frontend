import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/link-input', 'Integration | Component | widgets/forms/link input');

test('it renders', function(assert) {
  this.render(hbs`{{widgets/forms/link-input}}`);
  assert.ok(this.$().html().trim().includes('http'));
});
