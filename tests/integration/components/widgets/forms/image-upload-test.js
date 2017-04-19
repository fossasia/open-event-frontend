import { test } from 'ember-qunit';
import moduleForComponent from '../../../../helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/image-upload', 'Integration | Component | widgets/forms/image upload');

test('it renders', function(assert) {
  this.render(hbs`{{widgets/forms/image-upload maxSizeInKb=10000}}`);
  assert.ok(this.$().html().trim().includes('click or drag-and-drop'));
});
