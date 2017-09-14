import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/file-upload', 'Integration | Component | widgets/forms/file upload');

test('it renders', function(assert) {
  this.render(hbs`{{widgets/forms/file-upload maxSizeInKb=10000 hint=(t 'Select a file')}}`);
  assert.ok(this.$().html().trim().includes('Select'));
});
