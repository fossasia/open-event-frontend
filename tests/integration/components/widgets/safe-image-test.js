import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/safe-image', 'Integration | Component | widgets/safe image');

test('it renders', function(assert) {
  this.render(hbs`{{widgets/safe-image}}`);
  assert.ok(this.$().html().trim().includes('img'));
});
