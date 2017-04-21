import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/rich-text-editor', 'Integration | Component | widgets/forms/rich text editor');

test('it renders', function(assert) {
  this.render(hbs`{{widgets/forms/rich-text-editor textareaId='description'}}`);
  assert.ok(this.$().html().trim().includes('description'));
});
