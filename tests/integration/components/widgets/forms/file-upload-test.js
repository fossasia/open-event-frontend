import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | widgets/forms/file upload', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', function(assert) {
    this.render(hbs`{{widgets/forms/file-upload maxSizeInKb=10000 hint=(t 'Select a file')}}`);
    assert.ok(find('*').innerHTML.trim().includes('Select'));
  });
});
